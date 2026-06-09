import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTags = {
	resource: ['tag'],
};

export const tagDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTags,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get board tags',
				routing: {
					request: {
						method: 'GET',
						url: '=/boards/{{$parameter.boardId}}/tags',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a tag',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/tags',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a tag',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/{{$parameter.boardId}}/tags/{{$parameter.tagId}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a tag',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/boards/{{$parameter.boardId}}/tags/{{$parameter.tagId}}',
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
				resource: ['tag'],
				operation: ['getAll', 'create', 'update', 'delete'],
			},
		},
		description: 'Board identifier',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['update', 'delete'],
			},
		},
		description: 'Tag identifier',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['create', 'update'],
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
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '#ffffff',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['create', 'update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'color',
			},
		},
	},
];
