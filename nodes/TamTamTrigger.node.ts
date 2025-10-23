import {
    IWebhookFunctions,
    INodeType,
    INodeTypeDescription,
    IWebhookResponseData,
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
            // ... (свойства триггера)
        ],
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        // ... (реализация webhook)
    }
}