import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    apiRequest,
    apiRequestAllItems,
} from './GenericFunctions';

export class TamTam implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'TamTam',
        name: 'tamTam',
        icon: 'file:tamtan.svg',
        group: ['output'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with TamTam API',
        defaults: {
            name: 'TamTam',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'tamTamApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Chat',
                        value: 'chat',
                    },
                    {
                        name: 'Message',
                        value: 'message',
                    },
                    {
                        name: 'Subscription',
                        value: 'subscription',
                    },
                    {
                        name: 'Upload',
                        value: 'upload',
                    },
                    {
                        name: 'User',
                        value: 'user',
                    },
                ],
                default: 'message',
            },
            ...this.getChatOperations(),
            ...this.getMessageOperations(),
            ...this.getSubscriptionOperations(),
            ...this.getUploadOperations(),
            ...this.getUserOperations(),
        ],
    };

    private getChatOperations() {
        return [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['chat'],
                    },
                },
                options: [
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a chat',
                        action: 'Get a chat',
                    },
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all chats',
                        action: 'Get all chats',
                    },
                    {
                        name: 'Get Members',
                        value: 'getMembers',
                        description: 'Get chat members',
                        action: 'Get chat members',
                    },
                    {
                        name: 'Leave',
                        value: 'leave',
                        description: 'Leave a chat',
                        action: 'Leave a chat',
                    },
                    {
                        name: 'Send Action',
                        value: 'sendAction',
                        description: 'Send typing action',
                        action: 'Send typing action',
                    },
                ],
                default: 'get',
            },
        ];
    }

    private getMessageOperations() {
        return [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                    },
                },
                options: [
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: 'Delete a message',
                        action: 'Delete a message',
                    },
                    {
                        name: 'Edit',
                        value: 'edit',
                        description: 'Edit a message',
                        action: 'Edit a message',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a message',
                        action: 'Get a message',
                    },
                    {
                        name: 'Send',
                        value: 'send',
                        description: 'Send a message',
                        action: 'Send a message',
                    },
                    {
                        name: 'Send Audio',
                        value: 'sendAudio',
                        description: 'Send an audio message',
                        action: 'Send an audio message',
                    },
                    {
                        name: 'Send File',
                        value: 'sendFile',
                        description: 'Send a file',
                        action: 'Send a file',
                    },
                    {
                        name: 'Send Photo',
                        value: 'sendPhoto',
                        description: 'Send a photo',
                        action: 'Send a photo',
                    },
                    {
                        name: 'Send Video',
                        value: 'sendVideo',
                        description: 'Send a video',
                        action: 'Send a video',
                    },
                    {
                        name: 'Pin',
                        value: 'pin',
                        description: 'Pin a message',
                        action: 'Pin a message',
                    },
                    {
                        name: 'Unpin',
                        value: 'unpin',
                        description: 'Unpin a message',
                        action: 'Unpin a message',
                    },
                ],
                default: 'send',
            },
        ];
    }

    private getSubscriptionOperations() {
        return [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['subscription'],
                    },
                },
                options: [
                    {
                        name: 'Get Updates',
                        value: 'getUpdates',
                        description: 'Get updates via webhook',
                        action: 'Get updates via webhook',
                    },
                    {
                        name: 'Set Webhook',
                        value: 'setWebhook',
                        description: 'Set webhook URL',
                        action: 'Set webhook URL',
                    },
                    {
                        name: 'Delete Webhook',
                        value: 'deleteWebhook',
                        description: 'Delete webhook',
                        action: 'Delete webhook',
                    },
                ],
                default: 'getUpdates',
            },
        ];
    }

    private getUploadOperations() {
        return [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['upload'],
                    },
                },
                options: [
                    {
                        name: 'Upload File',
                        value: 'uploadFile',
                        description: 'Upload a file',
                        action: 'Upload a file',
                    },
                    {
                        name: 'Get Upload URL',
                        value: 'getUploadUrl',
                        description: 'Get upload URL',
                        action: 'Get upload URL',
                    },
                ],
                default: 'uploadFile',
            },
        ];
    }

    private getUserOperations() {
        return [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['user'],
                    },
                },
                options: [
                    {
                        name: 'Get Me',
                        value: 'getMe',
                        description: 'Get current user info',
                        action: 'Get current user info',
                    },
                    {
                        name: 'Get User',
                        value: 'getUser',
                        description: 'Get user by ID',
                        action: 'Get user by ID',
                    },
                ],
                default: 'getMe',
            },
        ];
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const length = items.length;
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        for (let i = 0; i < length; i++) {
            try {
                if (resource === 'chat') {
                    if (operation === 'get') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const response = await apiRequest.call(this, 'GET', `/chats/${chatId}`);
                        returnData.push({ json: response });
                    } else if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i) as boolean;
                        const filters = this.getNodeParameter('filters', i) as any;

                        if (returnAll) {
                            const response = await apiRequestAllItems.call(this, 'GET', '/chats', {}, filters);
                            returnData.push(...response);
                        } else {
                            const limit = this.getNodeParameter('limit', i) as number;
                            filters.count = limit;
                            const response = await apiRequest.call(this, 'GET', '/chats', {}, filters);
                            returnData.push(...response.chats);
                        }
                    } else if (operation === 'getMembers') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const returnAll = this.getNodeParameter('returnAll', i) as boolean;

                        if (returnAll) {
                            const response = await apiRequestAllItems.call(this, 'GET', `/chats/${chatId}/members`);
                            returnData.push(...response);
                        } else {
                            const limit = this.getNodeParameter('limit', i) as number;
                            const response = await apiRequest.call(this, 'GET', `/chats/${chatId}/members`, {}, { count: limit });
                            returnData.push(...response.members);
                        }
                    } else if (operation === 'leave') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const response = await apiRequest.call(this, 'POST', `/chats/${chatId}/leave`);
                        returnData.push({ json: response });
                    } else if (operation === 'sendAction') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const action = this.getNodeParameter('action', i) as string;
                        const response = await apiRequest.call(this, 'POST', `/chats/${chatId}/actions`, { action });
                        returnData.push({ json: response });
                    }
                } else if (resource === 'message') {
                    if (operation === 'send') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const text = this.getNodeParameter('text', i) as string;
                        const additionalFields = this.getNodeParameter('additionalFields', i) as any;

                        const body: any = {
                            chat_id: chatId,
                            text,
                        };

                        if (additionalFields.attachments) {
                            body.attachments = additionalFields.attachments;
                        }

                        if (additionalFields.disableLinkPreview) {
                            body.disable_link_preview = additionalFields.disableLinkPreview;
                        }

                        const response = await apiRequest.call(this, 'POST', '/messages', body);
                        returnData.push({ json: response });
                    } else if (operation === 'edit') {
                        const messageId = this.getNodeParameter('messageId', i) as string;
                        const text = this.getNodeParameter('text', i) as string;
                        const additionalFields = this.getNodeParameter('additionalFields', i) as any;

                        const body: any = {
                            text,
                        };

                        if (additionalFields.attachments) {
                            body.attachments = additionalFields.attachments;
                        }

                        const response = await apiRequest.call(this, 'PUT', `/messages/${messageId}`, body);
                        returnData.push({ json: response });
                    } else if (operation === 'delete') {
                        const messageId = this.getNodeParameter('messageId', i) as string;
                        const response = await apiRequest.call(this, 'DELETE', `/messages/${messageId}`);
                        returnData.push({ json: response });
                    } else if (operation === 'get') {
                        const messageId = this.getNodeParameter('messageId', i) as string;
                        const response = await apiRequest.call(this, 'GET', `/messages/${messageId}`);
                        returnData.push({ json: response });
                    } else if (operation === 'sendAudio') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const audio = this.getNodeParameter('audio', i) as string;
                        const body = {
                            chat_id: chatId,
                            audio: {
                                token: audio,
                            },
                        };
                        const response = await apiRequest.call(this, 'POST', '/messages', body);
                        returnData.push({ json: response });
                    } else if (operation === 'sendFile') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const file = this.getNodeParameter('file', i) as string;
                        const body = {
                            chat_id: chatId,
                            file: {
                                token: file,
                            },
                        };
                        const response = await apiRequest.call(this, 'POST', '/messages', body);
                        returnData.push({ json: response });
                    } else if (operation === 'sendPhoto') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const photo = this.getNodeParameter('photo', i) as string;
                        const body = {
                            chat_id: chatId,
                            photo: {
                                token: photo,
                            },
                        };
                        const response = await apiRequest.call(this, 'POST', '/messages', body);
                        returnData.push({ json: response });
                    } else if (operation === 'sendVideo') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const video = this.getNodeParameter('video', i) as string;
                        const body = {
                            chat_id: chatId,
                            video: {
                                token: video,
                            },
                        };
                        const response = await apiRequest.call(this, 'POST', '/messages', body);
                        returnData.push({ json: response });
                    } else if (operation === 'pin') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const messageId = this.getNodeParameter('messageId', i) as string;
                        const response = await apiRequest.call(this, 'POST', `/chats/${chatId}/pin`, { message_id: messageId });
                        returnData.push({ json: response });
                    } else if (operation === 'unpin') {
                        const chatId = this.getNodeParameter('chatId', i) as string;
                        const messageId = this.getNodeParameter('messageId', i) as string;
                        const response = await apiRequest.call(this, 'DELETE', `/chats/${chatId}/pin`, { message_id: messageId });
                        returnData.push({ json: response });
                    }
                } else if (resource === 'subscription') {
                    if (operation === 'getUpdates') {
                        const response = await apiRequest.call(this, 'GET', '/subscriptions');
                        returnData.push({ json: response });
                    } else if (operation === 'setWebhook') {
                        const url = this.getNodeParameter('url', i) as string;
                        const body = {
                            url,
                            update_types: this.getNodeParameter('updateTypes', i) as string[],
                        };
                        const response = await apiRequest.call(this, 'POST', '/subscriptions', body);
                        returnData.push({ json: response });
                    } else if (operation === 'deleteWebhook') {
                        const response = await apiRequest.call(this, 'DELETE', '/subscriptions');
                        returnData.push({ json: response });
                    }
                } else if (resource === 'upload') {
                    if (operation === 'uploadFile') {
                        const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
                        const item = items[i];

                        if (item.binary === undefined || item.binary[binaryPropertyName] === undefined) {
                            throw new Error(`No binary data property "${binaryPropertyName}" does not exists on item!`);
                        }

                        const binaryData = item.binary[binaryPropertyName];
                        const formData = {
                            data: {
                                value: Buffer.from(binaryData.data, 'binary'),
                                options: {
                                    filename: binaryData.fileName,
                                    contentType: binaryData.mimeType,
                                },
                            },
                        };

                        const response = await apiRequest.call(
                            this,
                            'POST',
                            '/uploads',
                            {},
                            {},
                            {
                                formData,
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            }
                        );

                        returnData.push({ json: response });
                    } else if (operation === 'getUploadUrl') {
                        const response = await apiRequest.call(this, 'GET', '/uploads');
                        returnData.push({ json: response });
                    }
                } else if (resource === 'user') {
                    if (operation === 'getMe') {
                        const response = await apiRequest.call(this, 'GET', '/me');
                        returnData.push({ json: response });
                    } else if (operation === 'getUser') {
                        const userId = this.getNodeParameter('userId', i) as string;
                        const response = await apiRequest.call(this, 'GET', `/users/${userId}`);
                        returnData.push({ json: response });
                    }
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
                } else {
                    throw error;
                }
            }
        }

        return [returnData];
    }
}