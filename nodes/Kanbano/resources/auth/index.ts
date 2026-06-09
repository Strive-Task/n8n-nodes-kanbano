import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAuth = {
	resource: ['auth'],
};

export const authDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAuth,
		},
		options: [
			{
				name: 'Login',
				value: 'login',
				action: 'Login with email and password',
				routing: {
					request: {
						method: 'POST',
						url: '/auth/login',
					},
				},
			},
			{
				name: 'Recover Password',
				value: 'recoverPassword',
				action: 'Recover password with token',
				routing: {
					request: {
						method: 'POST',
						url: '/auth/recover-password',
					},
				},
			},
			{
				name: 'Refresh',
				value: 'refresh',
				action: 'Refresh access token',
				routing: {
					request: {
						method: 'GET',
						url: '/auth/refresh',
					},
				},
			},
			{
				name: 'Register',
				value: 'register',
				action: 'Register a user',
				routing: {
					request: {
						method: 'POST',
						url: '/auth/register',
					},
				},
			},
			{
				name: 'Request Password Reset',
				value: 'requestPasswordReset',
				action: 'Request a reset password email',
				routing: {
					request: {
						method: 'POST',
						url: '/auth/reset-password',
					},
				},
			},
			{
				name: 'Sign Out',
				value: 'signOut',
				action: 'Sign out by refresh token',
				routing: {
					request: {
						method: 'POST',
						url: '/auth/sign-out',
					},
				},
			},
			{
				name: 'Verify Email Registration',
				value: 'verifyEmailRegistration',
				action: 'Verify email code and create user',
				routing: {
					request: {
						method: 'POST',
						url: '/auth/verify-email-registration',
					},
				},
			},
		],
		default: 'login',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['login', 'register', 'requestPasswordReset', 'verifyEmailRegistration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'email',
			},
		},
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['login', 'register', 'recoverPassword'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'password',
			},
		},
	},
	{
		displayName: 'Password Confirmation',
		name: 'password2',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['recoverPassword'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'password2',
			},
		},
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['verifyEmailRegistration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'code',
			},
		},
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['verifyEmailRegistration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'platform',
			},
		},
	},
	{
		displayName: 'Refresh Token',
		name: 'refreshTokenQuery',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['refresh'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'refreshToken',
			},
		},
	},
	{
		displayName: 'Refresh Token',
		name: 'refreshTokenBody',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['signOut'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'refreshToken',
			},
		},
	},
	{
		displayName: 'Recovery Token',
		name: 'token',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['recoverPassword'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'token',
			},
		},
	},
];
