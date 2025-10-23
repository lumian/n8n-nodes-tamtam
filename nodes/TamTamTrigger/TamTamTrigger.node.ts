import {
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
} from 'n8n-workflow';

export class TamTamTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TamTam Trigger',
		name: 'tamTamTrigger',
		icon: 'file:tamtam.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle TamTam events via webhook',
		defaults: {
			name: 'TamTam Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'tamTamApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Update Types',
				name: 'updateTypes',
				type: 'multiOptions',
				options: [
					{
						name: 'Message Created',
						value: 'message_created',
					},
					{
						name: 'Message Edited',
						value: 'message_edited',
					},
					{
						name: 'Message Removed',
						value: 'message_removed',
					},
					{
						name: 'Bot Added',
						value: 'bot_added',
					},
					{
						name: 'Bot Removed',
						value: 'bot_removed',
					},
					{
						name: 'User Added',
						value: 'user_added',
					},
					{
						name: 'User Removed',
						value: 'user_removed',
					},
					{
						name: 'Chat Created',
						value: 'chat_created',
					},
					{
						name: 'Message Callback',
						value: 'message_callback',
					},
				],
				default: ['message_created'],
				description: 'Types of updates to receive',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData() as IDataObject;
		const updateType = body.update_type as string;

		const updateTypes = this.getNodeParameter('updateTypes', []) as string[];

		if (!updateTypes.includes(updateType)) {
			return {};
		}

		return {
			workflowData: [
				this.helpers.returnJsonArray(body),
			],
		};
	}
}