import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUsers = {
	resource: ['user'],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUsers,
		},
		options: [
			{
				name: 'Change Password',
				value: 'changePassword',
				action: 'Change current user password',
				routing: {
					request: {
						method: 'PATCH',
						url: '/user/password',
					},
				},
			},
			{
				name: 'Create Unauthorized',
				value: 'createUnauthorized',
				action: 'Create temporary unauthorized user',
				routing: {
					request: {
						method: 'POST',
						url: '/user/create/unauthorized',
					},
				},
			},
			{
				name: 'Delete Avatar',
				value: 'deleteAvatar',
				action: 'Delete current user avatar',
				routing: {
					request: {
						method: 'DELETE',
						url: '/user/avatar',
					},
				},
			},
			{
				name: 'Delete Me',
				value: 'deleteMe',
				action: 'Delete current user account',
				routing: {
					request: {
						method: 'DELETE',
						url: '/user/me',
					},
				},
			},
			{
				name: 'Get Me',
				value: 'getMe',
				action: 'Get current user profile',
				routing: {
					request: {
						method: 'GET',
						url: '/user/me',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update current user name',
				routing: {
					request: {
						method: 'PATCH',
						url: '/user/me/name',
					},
				},
			},
		],
		default: 'getMe',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateName', 'createUnauthorized'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Session ID',
		name: 'sessionId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUnauthorized'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'sessionId',
			},
		},
	},
	{
		displayName: 'Old Password',
		name: 'oldPassword',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['changePassword'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'oldPassword',
			},
		},
	},
	{
		displayName: 'New Password',
		name: 'newPassword',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['changePassword'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'newPassword',
			},
		},
	},
];
