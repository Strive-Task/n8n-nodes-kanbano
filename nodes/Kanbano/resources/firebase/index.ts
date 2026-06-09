import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFirebase = {
	resource: ['firebase'],
};

export const firebaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForFirebase,
		},
		options: [
			{
				name: 'Assign Token',
				value: 'assignToken',
				action: 'Assign firebase token to current user',
				routing: {
					request: {
						method: 'POST',
						url: '/firebase',
					},
				},
			},
			{
				name: 'Revoke Token',
				value: 'revokeToken',
				action: 'Revoke firebase token',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/firebase/{{$parameter.firebaseToken}}',
					},
				},
			},
		],
		default: 'assignToken',
	},
	{
		displayName: 'Firebase Token',
		name: 'firebaseToken',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['firebase'],
				operation: ['assignToken', 'revokeToken'],
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
