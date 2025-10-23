import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TamTamApi implements ICredentialType {
	name = 'tamTamApi';
	displayName = 'TamTam API';
	documentationUrl = 'https://dev.tamtam.chat';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Bot access token from TamTam',
		},
	];
}