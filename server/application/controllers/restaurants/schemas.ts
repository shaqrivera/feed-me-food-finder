import { CONTENT_TYPE_JSON } from "../../../utils/schemas"

export const RESTAURANT_SCHEMA = {
    $id: 'restaurant',
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "alias": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "image_url": {
            "type": "string",
            "format": "uri"
        },
        "is_closed": {
            "type": "boolean"
        },
        "url": {
            "type": "string",
            "format": "uri"
        },
        "review_count": {
            "type": "integer"
        },
        "categories": {
            "type": "array",
            "items": {
            "type": "object",
            "properties": {
                "alias": {
                "type": "string"
                },
                "title": {
                "type": "string"
                }
            },
            }
        },
        "rating": {
            "type": "number"
        },
        "coordinates": {
            "type": "object",
            "properties": {
            "latitude": {
                "type": "number"
            },
            "longitude": {
                "type": "number"
            }
            },
        },
        "transactions": {
            "type": "array",
            "items": {
            "type": "string"
            }
        },
        "price": {
            "type": "string"
        },
        "location": {
            "type": "object",
            "properties": {
            "address1": {
                "type": "string"
            },
            "address2": {
                "type": "string"
            },
            "address3": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "zip_code": {
                "type": "string"
            },
            "country": {
                "type": "string"
            },
            "state": {
                "type": "string"
            },
            "display_address": {
                "type": "array",
                "items": {
                "type": "string"
                }
            }
            },
        },
        "phone": {
            "type": "string"
        },
        "display_phone": {
            "type": "string"
        },
        "distance": {
            "type": "number"
        }
    },
  }
  
  export const SEARCH_RESTAURANT_OPTIONS = {
    schema: {
        description: 'Returns a single restaurant based on the search terms and the zip code',
        querystring: {
            search: {
              type: 'string',
              description: 'Comma-separated terms used in the restaurant search',
            },
            zipCode: {
                type: 'string',
                description: 'The zip code to use for the restaurant search',
            }
          },
        response: { 200: { $ref: 'restaurant' } },
        ...CONTENT_TYPE_JSON,
    },
    config: {
        secured: true
    }
}