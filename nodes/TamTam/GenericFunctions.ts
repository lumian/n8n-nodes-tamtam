import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	IDataObject,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

/**
 * Make an API request to TamTam
 */
export async function apiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	headers: IDataObject = {},
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

	if (Object.keys(query).length !== 0) {
		options.qs = query;
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		return await this.helpers.request!(options);
	} catch (error) {
		const errorMessage = (error as Error).message;
		throw new Error(`TamTam API Error: ${errorMessage}`);
	}
}

/**
 * Make an API request to paginated TamTam endpoints
 */
export async function apiRequestAllItems(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];
	let responseData;
	query.marker = undefined;

	do {
		responseData = await apiRequest.call(this, method, endpoint, body, query);
		const items = responseData.chats || responseData.members || responseData.updates || [];
		returnData.push(...items);
		query.marker = responseData.marker;
	} while (responseData.marker);

	return returnData;
}