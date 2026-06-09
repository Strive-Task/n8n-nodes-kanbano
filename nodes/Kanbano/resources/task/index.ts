import type { INodeProperties } from 'n8n-workflow';
import {
	BOOLEAN_FLAG_TO_ONE_EXPRESSION,
	NUMBER_LIST_TO_CSV_EXPRESSION,
	ORDER_TO_API_EXPRESSION,
} from '../../helpers';

const showOnlyForTasks = {
	resource: ['task'],
};

export const taskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTasks,
		},
		options: [
			{
				name: 'Add Member',
				value: 'addMember',
				action: 'Add task member',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/add-member/{{$parameter.memberId}}',
					},
				},
			},
			{
				name: 'Add Performer',
				value: 'addPerformer',
				action: 'Add task performer',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/add-performer',
					},
				},
			},
			{
				name: 'Add Tag',
				value: 'addTag',
				action: 'Attach tag to task',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/tags',
					},
				},
			},
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive a task',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/archive',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a task',
				routing: {
					request: {
						method: 'POST',
						url: '/tasks',
					},
				},
			},
			{
				name: 'Create Share Link',
				value: 'createShareLink',
				action: 'Create or refresh task share link',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{$parameter.taskId}}/share',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a task',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}',
					},
				},
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				action: 'Duplicate a task',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{$parameter.taskId}}/duplicate',
					},
				},
			},
			{
				name: 'Get History',
				value: 'getHistory',
				action: 'Get task history',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{$parameter.taskId}}/history',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get board tasks',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/by-board/{{$parameter.boardId}}',
					},
				},
			},
			{
				name: 'Get Share Link',
				value: 'getShareLink',
				action: 'Get task share link',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{$parameter.taskId}}/share',
					},
				},
			},
			{
				name: 'Move',
				value: 'move',
				action: 'Move task to another column',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/order',
					},
				},
			},
			{
				name: 'Remove All Performers',
				value: 'removeAllPerformers',
				action: 'Remove all task performers',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/remove-all-performers',
					},
				},
			},
			{
				name: 'Remove All Tags',
				value: 'removeAllTags',
				action: 'Remove all task tags',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/tags',
					},
				},
			},
			{
				name: 'Remove Member',
				value: 'removeMember',
				action: 'Remove task member',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/remove-member/{{$parameter.memberId}}',
					},
				},
			},
			{
				name: 'Remove Performer',
				value: 'removePerformer',
				action: 'Remove task performer',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/remove-performer',
					},
				},
			},
			{
				name: 'Remove Tag',
				value: 'removeTag',
				action: 'Remove tag from task',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/tags/{{$parameter.tagId}}',
					},
				},
			},
			{
				name: 'Update Date',
				value: 'updateDate',
				action: 'Update task dates',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/date',
					},
				},
			},
			{
				name: 'Update Description',
				value: 'updateDescription',
				action: 'Update task description',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/description',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update task name',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/name',
					},
				},
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				action: 'Update task status',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/status',
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
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		description: 'Board identifier',
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: [
					'addMember',
					'addPerformer',
					'addTag',
					'archive',
					'createShareLink',
					'delete',
					'duplicate',
					'getHistory',
					'getShareLink',
					'move',
					'removeAllPerformers',
					'removeAllTags',
					'removeMember',
					'removePerformer',
					'removeTag',
					'updateDate',
					'updateDescription',
					'updateName',
					'updateStatus',
				],
			},
		},
		description: 'Task identifier',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
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
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'updateDescription'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
	},
	{
		displayName: 'Column ID',
		name: 'columnId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'move'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'columnId',
			},
		},
	},
	{
		displayName: 'Direction',
		name: 'direction',
		type: 'options',
		options: [
			{
				name: 'Bottom',
				value: 'bottom',
			},
			{
				name: 'Top',
				value: 'top',
			},
		],
		default: 'bottom',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'direction',
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
				resource: ['task'],
				operation: ['create', 'move'],
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
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Completed',
				value: 1,
			},
			{
				name: 'In Work',
				value: 0,
			},
		],
		default: 0,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateStatus'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'status',
			},
		},
	},
	{
		displayName: 'Date Begin',
		name: 'dateBegin',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateDate'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'dateBegin',
			},
		},
	},
	{
		displayName: 'Date End',
		name: 'dateEnd',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateDate'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'dateEnd',
			},
		},
	},
	{
		displayName: 'Performer ID',
		name: 'performerId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addPerformer', 'removePerformer'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'performerId',
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
				resource: ['task'],
				operation: ['addMember', 'removeMember'],
			},
		},
		description: 'Task member identifier',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addTag', 'removeTag'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'tagId',
			},
		},
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'search',
			},
		},
	},
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'archived',
			},
		},
	},
	{
		displayName: 'Creators',
		name: 'creators',
		type: 'string',
		default: '',
		placeholder: '1,2,3',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		description: 'Comma-separated creator IDs',
		routing: {
			send: {
				type: 'query',
				property: 'creators',
				value: NUMBER_LIST_TO_CSV_EXPRESSION,
			},
		},
	},
	{
		displayName: 'Performers',
		name: 'performers',
		type: 'string',
		default: '',
		placeholder: '4,8,15',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		description: 'Comma-separated performer IDs',
		routing: {
			send: {
				type: 'query',
				property: 'performers',
				value: NUMBER_LIST_TO_CSV_EXPRESSION,
			},
		},
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		placeholder: '3,5,7',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		description: 'Comma-separated tag IDs',
		routing: {
			send: {
				type: 'query',
				property: 'tags',
				value: NUMBER_LIST_TO_CSV_EXPRESSION,
			},
		},
	},
	{
		displayName: 'Creator Not Me',
		name: 'creatorNotMe',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'creatorNotMe',
				value: BOOLEAN_FLAG_TO_ONE_EXPRESSION,
			},
		},
	},
	{
		displayName: 'No Performers',
		name: 'noPerformers',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'noPerformers',
				value: BOOLEAN_FLAG_TO_ONE_EXPRESSION,
			},
		},
	},
];
