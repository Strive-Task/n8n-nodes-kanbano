import type { INodeProperties } from 'n8n-workflow';
import { ORDER_TO_API_EXPRESSION } from '../../helpers';

const showOnlyForChecklist = {
	resource: ['checklist'],
};

export const checklistDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForChecklist,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a checklist item',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks/{{$parameter.taskId}}/checklist',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete checklist item',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/checklist/{{$parameter.checklistItemId}}',
					},
				},
			},
			{
				name: 'Delete All',
				value: 'deleteAll',
				action: 'Delete all checklist items',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}/checklist',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get task checklist items',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{$parameter.taskId}}/checklist',
					},
				},
			},
			{
				name: 'Toggle',
				value: 'toggle',
				action: 'Toggle checklist item checked state',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/checklist/{{$parameter.checklistItemId}}/toggle',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update checklist item name',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/checklist/{{$parameter.checklistItemId}}/name',
					},
				},
			},
			{
				name: 'Update Order',
				value: 'updateOrder',
				action: 'Update checklist item order',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}/checklist/{{$parameter.checklistItemId}}/order',
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
				resource: ['checklist'],
				operation: [
					'getAll',
					'create',
					'updateName',
					'updateOrder',
					'toggle',
					'delete',
					'deleteAll',
				],
			},
		},
		description: 'Task identifier',
	},
	{
		displayName: 'Checklist Item ID',
		name: 'checklistItemId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['checklist'],
				operation: ['updateName', 'updateOrder', 'toggle', 'delete'],
			},
		},
		description: 'Checklist item identifier',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checklist'],
				operation: ['create', 'updateName'],
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
				resource: ['checklist'],
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
		displayName: 'Checked',
		name: 'isChecked',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['checklist'],
				operation: ['create', 'toggle'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'isChecked',
			},
		},
	},
];
