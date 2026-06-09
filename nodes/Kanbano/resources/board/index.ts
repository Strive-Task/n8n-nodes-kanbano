import type { INodeProperties } from 'n8n-workflow';
import { ORDER_TO_API_EXPRESSION } from '../../helpers';

const showOnlyForBoards = {
	resource: ['board'],
};

export const boardDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBoards,
		},
		options: [
			{
				name: 'Accept Access Request',
				value: 'acceptAccessRequest',
				action: 'Accept board access request',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/access-request/accept',
					},
				},
			},
			{
				name: 'Add Member',
				value: 'addMember',
				action: 'Add board member by user id and role',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/members',
					},
				},
			},
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive a board',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/archive',
					},
				},
			},
			{
				name: 'Change Cover',
				value: 'changeCover',
				action: 'Change board color cover',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/cover',
					},
				},
			},
			{
				name: 'Change Member Role',
				value: 'changeMemberRole',
				action: 'Change board member role',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/members',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a board',
				routing: {
					request: {
						method: 'POST',
						url: '/boards',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a board',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/boards/{{$parameter.boardId}}',
					},
				},
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				action: 'Duplicate a board',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/duplicate',
					},
				},
			},
			{
				name: 'Get Access Requests',
				value: 'getAccessRequests',
				action: 'Get board access requests',
				routing: {
					request: {
						method: 'GET',
						url: '=/boards/{{$parameter.boardId}}/access-requests',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get boards',
				routing: {
					request: {
						method: 'GET',
						url: '/boards',
					},
				},
			},
			{
				name: 'Get Members',
				value: 'getMembers',
				action: 'Get board members',
				routing: {
					request: {
						method: 'GET',
						url: '=/boards/{{$parameter.boardId}}/members',
					},
				},
			},
			{
				name: 'Get Public Token',
				value: 'getPublicToken',
				action: 'Get board public token',
				routing: {
					request: {
						method: 'GET',
						url: '=/boards/{{$parameter.boardId}}/public-token',
					},
				},
			},
			{
				name: 'Invite Member By Email',
				value: 'inviteMemberByEmail',
				action: 'Invite board member by email',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/members/invite',
					},
				},
			},
			{
				name: 'Is Access Request Sent',
				value: 'isAccessRequestSent',
				action: 'Check whether access request is sent',
				routing: {
					request: {
						method: 'GET',
						url: '=/boards/{{$parameter.boardId}}/access-request',
					},
				},
			},
			{
				name: 'Precheck Invite',
				value: 'precheckInvite',
				action: 'Precheck board invite by email',
				routing: {
					request: {
						method: 'GET',
						url: '=/boards/{{$parameter.boardId}}/members/invite-precheck',
					},
				},
			},
			{
				name: 'Reject Access Request',
				value: 'rejectAccessRequest',
				action: 'Reject board access request',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/access-request/reject',
					},
				},
			},
			{
				name: 'Remove Cover',
				value: 'removeCover',
				action: 'Remove board cover',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/boards/{{$parameter.boardId}}/cover',
					},
				},
			},
			{
				name: 'Remove Member',
				value: 'removeMember',
				action: 'Remove board member',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/boards/{{$parameter.boardId}}/members/{{$parameter.memberId}}',
					},
				},
			},
			{
				name: 'Send Access Request',
				value: 'sendAccessRequest',
				action: 'Send board access request',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/access-request',
					},
				},
			},
			{
				name: 'Set Favorite',
				value: 'setFavorite',
				action: 'Set board favorite state',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/favorite',
					},
				},
			},
			{
				name: 'Set Public',
				value: 'setPublic',
				action: 'Set board public state',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/public',
					},
				},
			},
			{
				name: 'Unarchive',
				value: 'unarchive',
				action: 'Unarchive a board',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/unarchive',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update board name',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/name',
					},
				},
			},
			{
				name: 'Update Order',
				value: 'updateOrder',
				action: 'Update board order',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/order',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Board ID',
		name: 'boardId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: [
					'acceptAccessRequest',
					'addMember',
					'archive',
					'changeCover',
					'changeMemberRole',
					'delete',
					'duplicate',
					'getAccessRequests',
					'getMembers',
					'getPublicToken',
					'inviteMemberByEmail',
					'isAccessRequestSent',
					'precheckInvite',
					'rejectAccessRequest',
					'removeCover',
					'removeMember',
					'sendAccessRequest',
					'setFavorite',
					'setPublic',
					'unarchive',
					'updateName',
					'updateOrder',
				],
			},
		},
		description: 'Board identifier',
	},
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'archived',
			},
		},
		description: 'Whether to return archived boards',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['create', 'duplicate', 'updateName'],
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
		displayName: 'Favorite',
		name: 'favorite',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['create', 'setFavorite'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'favorite',
			},
		},
	},
	{
		displayName: 'Is Public',
		name: 'isPublic',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['setPublic'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'isPublic',
			},
		},
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['create', 'updateOrder'],
			},
		},
		description: 'Display order in UI units; the node scales it for API compatibility',
		routing: {
			send: {
				type: 'body',
				property: 'order',
				value: ORDER_TO_API_EXPRESSION,
			},
		},
	},
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['removeMember'],
			},
		},
		description: 'Board member user ID',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['acceptAccessRequest', 'rejectAccessRequest'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'userId',
			},
		},
	},
	{
		displayName: 'Invite Email',
		name: 'inviteEmail',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['inviteMemberByEmail'],
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
		displayName: 'Invite Email',
		name: 'inviteEmailQuery',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['precheckInvite'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'email',
			},
		},
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{
				name: 'Reader',
				value: 0,
			},
			{
				name: 'Editor',
				value: 1,
			},
			{
				name: 'Creator',
				value: 2,
			},
		],
		default: 1,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['addMember', 'changeMemberRole', 'inviteMemberByEmail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'role',
			},
		},
	},
	{
		displayName: 'Member User ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['addMember', 'changeMemberRole'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'id',
			},
		},
	},
	{
		displayName: 'Include Removed',
		name: 'includeRemoved',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['getMembers'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'includeRemoved',
			},
		},
	},
	{
		displayName: 'Cover',
		name: 'cover',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['changeCover'],
			},
		},
		description: 'Color cover value, for example #FFFFFF',
		routing: {
			send: {
				type: 'body',
				property: 'cover',
			},
		},
	},
];
