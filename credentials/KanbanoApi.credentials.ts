import type {
	IAuthenticate,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	IHttpRequestOptions,
} from 'n8n-workflow';

type AuthMode = 'accessToken' | 'login';

interface LoginResponse {
	access_token: string;
	refresh_token: string;
}

interface CachedTokens {
	accessToken: string;
	refreshToken: string;
	expiresAtMs: number;
}

const tokenCache = new Map<string, CachedTokens>();

const ACCESS_TOKEN_REFRESH_BUFFER_MS = 60_000;

function resolveBaseUrl(value: unknown): string {
	if (typeof value !== 'string' || value.trim() === '') {
		return 'https://api.kanbano.ru';
	}

	return value.trim().replace(/\/+$/, '');
}

function decodeJwtExpirationMs(token: string): number {
	const parts = token.split('.');
	if (parts.length < 2) {
		return Date.now();
	}

	const payload = Buffer.from(parts[1], 'base64url').toString('utf8');
	const parsed = JSON.parse(payload) as { exp?: number };
	if (typeof parsed.exp !== 'number') {
		return Date.now();
	}

	return parsed.exp * 1000;
}

async function requestJson<TResponse>(
	baseUrl: string,
	method: 'GET' | 'POST',
	path: string,
	options?: {
		query?: Record<string, string>;
		body?: Record<string, string>;
		headers?: Record<string, string>;
	},
): Promise<TResponse> {
	const url = new URL(path, `${baseUrl}/`);
	for (const [key, value] of Object.entries(options?.query ?? {})) {
		url.searchParams.set(key, value);
	}

	const response = await fetch(url.toString(), {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(options?.headers ?? {}),
		},
		body: options?.body ? JSON.stringify(options.body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`Kanbano auth request failed (${response.status})`);
	}

	return (await response.json()) as TResponse;
}

async function login(baseUrl: string, email: string, password: string): Promise<CachedTokens> {
	const response = await requestJson<LoginResponse>(baseUrl, 'POST', '/auth/login', {
		body: { email, password },
	});

	return {
		accessToken: response.access_token,
		refreshToken: response.refresh_token,
		expiresAtMs: decodeJwtExpirationMs(response.access_token),
	};
}

async function refresh(baseUrl: string, refreshToken: string): Promise<CachedTokens> {
	const response = await requestJson<LoginResponse>(baseUrl, 'GET', '/auth/refresh', {
		query: { refreshToken },
	});

	return {
		accessToken: response.access_token,
		refreshToken: response.refresh_token,
		expiresAtMs: decodeJwtExpirationMs(response.access_token),
	};
}

async function resolveLoginAccessToken(
	baseUrl: string,
	email: string,
	password: string,
): Promise<string> {
	const key = `${baseUrl}|${email.toLowerCase()}`;
	const cached = tokenCache.get(key);
	const now = Date.now();

	if (cached && cached.expiresAtMs - ACCESS_TOKEN_REFRESH_BUFFER_MS > now) {
		return cached.accessToken;
	}

	if (cached) {
		try {
			const refreshedTokens = await refresh(baseUrl, cached.refreshToken);
			tokenCache.set(key, refreshedTokens);
			return refreshedTokens.accessToken;
		} catch {
			// Ignore and fallback to full login.
		}
	}

	const loggedInTokens = await login(baseUrl, email, password);
	tokenCache.set(key, loggedInTokens);
	return loggedInTokens.accessToken;
}

export class KanbanoApi implements ICredentialType {
	name = 'kanbanoApi';

	displayName = 'Kanbano API';

	icon = 'file:../nodes/Kanbano/kanbano.svg' as const;

	documentationUrl = 'https://docs.kanbano.ru';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.kanbano.ru',
			placeholder: 'https://api.kanbano.ru',
			required: true,
		},
		{
			displayName: 'Authentication Mode',
			name: 'authMode',
			type: 'options',
			options: [
				{
					name: 'Access Token',
					value: 'accessToken',
				},
				{
					name: 'Email & Password (Auto Refresh)',
					value: 'login',
				},
			],
			default: 'accessToken',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			displayOptions: {
				show: {
					authMode: ['accessToken'],
				},
			},
		},
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					authMode: ['login'],
				},
			},
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			displayOptions: {
				show: {
					authMode: ['login'],
				},
			},
		},
	];

	authenticate: IAuthenticate = async (
		credentials: Record<string, unknown>,
		requestOptions: IHttpRequestOptions,
	) => {
		const mode = (credentials.authMode as AuthMode | undefined) ?? 'accessToken';
		const baseUrl = resolveBaseUrl(credentials.baseUrl);
		const headers = requestOptions.headers ?? {};

		if (mode === 'accessToken') {
			const accessToken = credentials.accessToken;
			if (typeof accessToken !== 'string' || accessToken.trim() === '') {
				throw new Error('Kanbano access token is missing.');
			}

			return {
				...requestOptions,
				baseURL: requestOptions.baseURL ?? baseUrl,
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken.trim()}`,
				},
			};
		}

		const email = credentials.email;
		const password = credentials.password;

		if (typeof email !== 'string' || email.trim() === '') {
			throw new Error('Kanbano email is missing.');
		}
		if (typeof password !== 'string' || password.trim() === '') {
			throw new Error('Kanbano password is missing.');
		}

		const accessToken = await resolveLoginAccessToken(baseUrl, email.trim(), password);
		return {
			...requestOptions,
			baseURL: requestOptions.baseURL ?? baseUrl,
			headers: {
				...headers,
				Authorization: `Bearer ${accessToken}`,
			},
		};
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/user/me',
		},
	};
}
