import {
    IExecuteFunctions,
    IHookFunctions,
    ILoadOptionsFunctions,
    IWebhookFunctions,
} from 'n8n-workflow';

import {
    OptionsWithUri,
} from 'request';

export async function apiRequest(
    this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions | IWebhookFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
    headers: any = {},
): Promise<any> {
    const credentials = await this.getCredentials('tamTamApi');

    const options: OptionsWithUri = {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'n8n',
            'Authorization': `Bearer ${credentials.accessToken}`,
        },
        method,
        body,
        qs: query,
        uri: `https://botapi.tamtam.chat${endpoint}`,
        json: true,
    };

    if (Object.keys(headers).length !== 0) {
        options.headers = { ...options.headers, ...headers };
    }

    try {
        return await this.helpers.request!(options);
    } catch (error) {
        throw new Error(`TamTam API Error: ${error.message}`);
    }
}

export async function apiRequestAllItems(
    this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
    method: string,
    endpoint: string,
    body: any = {},
    query: any = {},
): Promise<any> {
    const returnData: any[] = [];
    let responseData;
    query.marker = undefined;

    do {
        responseData = await apiRequest.call(this, method, endpoint, body, query);
        returnData.push(...responseData.chats || responseData.members || responseData.updates || []);
        query.marker = responseData.marker;
    } while (responseData.marker);

    return returnData;
}