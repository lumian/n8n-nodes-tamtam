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
        icon: 'file:tamtam.svg',
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
            // ... (все свойства из предыдущего кода остаются без изменений)
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        // ... (реализация execute из предыдущего кода)
    }
}