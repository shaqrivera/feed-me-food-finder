export const CONTENT_TYPE_JSON = {
    headers: {
        type: 'object',
        properties: {
            'content-type': {
                type: 'string',
                enum: ['application/json'],
                description: 'The payload is a valid serialized JSON object',
            }
        }
    }
}
