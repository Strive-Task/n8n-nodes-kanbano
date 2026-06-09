import type { INodeProperties } from 'n8n-workflow';
import { ORDER_TO_API_EXPRESSION } from '../../helpers';

const showOnlyForColumns = {
	resource: ['column'],
};

export const columnDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForColumns,
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive a column',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/columns/{{$parameter.columnId}}/archive',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a column',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/{{$parameter.boardId}}/columns',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a column',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/boards/columns/{{$parameter.columnId}}',
					},
				},
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				action: 'Duplicate a column',
				routing: {
					request: {
						method: 'POST',
						url: '=/boards/columns/{{$parameter.columnId}}/duplicate',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get board columns',
				routing: {
					request: {
						method: 'GET',
						url: '=/boards/{{$parameter.boardId}}/columns',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update a column name',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/columns/{{$parameter.columnId}}/name',
					},
				},
			},
			{
				name: 'Update Order',
				value: 'updateOrder',
				action: 'Update a column order',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/boards/columns/{{$parameter.columnId}}/order',
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
				resource: ['column'],
				operation: ['getAll', 'create'],
			},
		},
		description: 'Board identifier',
	},
	{
		displayName: 'Column ID',
		name: 'columnId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['column'],
				operation: ['updateName', 'updateOrder', 'archive', 'duplicate', 'delete'],
			},
		},
		description: 'Column identifier',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['column'],
				operation: ['create', 'updateName', 'duplicate'],
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
		displayName: 'Order',
		name: 'order',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['column'],
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
];
