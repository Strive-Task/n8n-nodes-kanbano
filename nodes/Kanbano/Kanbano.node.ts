import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { authDescription } from './resources/auth';
import { boardDescription } from './resources/board';
import { checklistDescription } from './resources/checklist';
import { columnDescription } from './resources/column';
import { firebaseDescription } from './resources/firebase';
import { tagDescription } from './resources/tag';
import { taskDescription } from './resources/task';
import { taskMessageDescription } from './resources/taskMessage';
import { userDescription } from './resources/user';

export class Kanbano implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kanbano',
		name: 'kanbano',
		icon: { light: 'file:kanbano.svg', dark: 'file:kanbano.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Kanbano API',
		defaults: {
			name: 'Kanbano',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'kanbanoApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Auth',
						value: 'auth',
					},
					{
						name: 'Board',
						value: 'board',
					},
					{
						name: 'Checklist',
						value: 'checklist',
					},
					{
						name: 'Column',
						value: 'column',
					},
					{
						name: 'Firebase',
						value: 'firebase',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Task Message',
						value: 'taskMessage',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'task',
			},
			...authDescription,
			...boardDescription,
			...checklistDescription,
			...columnDescription,
			...firebaseDescription,
			...tagDescription,
			...taskDescription,
			...taskMessageDescription,
			...userDescription,
		],
	};
}
