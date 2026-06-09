import type { INodeProperties } from 'n8n-workflow';
import { NUMBER_LIST_TO_CSV_EXPRESSION } from '../../helpers';

const showOnlyForTaskMessages = {
	resource: ['taskMessage'],
};

export const taskMessageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTaskMessages,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create task message',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{$parameter.taskId}}/messages',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete task message',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/messages/{{$parameter.messageId}}/deleted',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get task messages',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{$parameter.taskId}}/messages',
					},
				},
			},
			{
				name: 'Pin',
				value: 'pin',
				action: 'Pin or unpin task message',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/messages/{{$parameter.messageId}}/pinned',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update task message',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/messages/{{$parameter.messageId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['taskMessage'],
				operation: ['create', 'delete', 'getAll', 'pin', 'update'],
			},
		},
		description: 'Task identifier',
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['taskMessage'],
				operation: ['delete', 'pin', 'update'],
			},
		},
		description: 'Message identifier',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['taskMessage'],
				operation: ['create', 'update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},
	{
		displayName: 'Reply To Message ID',
		name: 'messageReplyId',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['taskMessage'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'messageReplyId',
			},
		},
	},
	{
		displayName: 'Removed File IDs',
		name: 'removedFileIds',
		type: 'string',
		default: '',
		placeholder: '1,2,3',
		displayOptions: {
			show: {
				resource: ['taskMessage'],
				operation: ['update'],
			},
		},
		description: 'Comma-separated IDs of files to remove from the message',
		routing: {
			send: {
				type: 'body',
				property: 'removedFileIds',
				value: NUMBER_LIST_TO_CSV_EXPRESSION,
			},
		},
	},
	{
		displayName: 'Is Pinned',
		name: 'isPinned',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['taskMessage'],
				operation: ['pin'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'isPinned',
			},
		},
	},
];
