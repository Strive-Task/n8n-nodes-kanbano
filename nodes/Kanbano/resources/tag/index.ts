import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTags = {
	resource: ['tag'],
};

const tagColorPalette =
	'#d3f7f4, #ffd7d4, #f6e8c1, #c1d6f6, #e2f6d6, #f7e0d3, #e1e0fa, #c7e3e1, #f3f3f3, #c2e8ff, #f6ccc1, #f3e3ff';
const tagColorGuidance = `When setting a tag color, use only one of the Kanbano palette values: ${tagColorPalette}. Other colors may make the black tag text unreadable.`;

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
				description: `Create a tag. Always specify a color. ${tagColorGuidance}`,
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
		description: tagColorGuidance,
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
