import { CONTENT_TYPE_JSON } from "../../../utils/schemas";

export const RECIPE_SCHEMA = {
    "$id": "recipe",
    "type": "object",
    "properties": {
      "vegetarian": { "type": "boolean" },
      "vegan": { "type": "boolean" },
      "glutenFree": { "type": "boolean" },
      "dairyFree": { "type": "boolean" },
      "veryHealthy": { "type": "boolean" },
      "cheap": { "type": "boolean" },
      "veryPopular": { "type": "boolean" },
      "sustainable": { "type": "boolean" },
      "lowFodmap": { "type": "boolean" },
      "weightWatcherSmartPoints": { "type": "integer" },
      "gaps": { "type": "string" },
      "preparationMinutes": { "type": "integer" },
      "cookingMinutes": { "type": "integer" },
      "aggregateLikes": { "type": "integer" },
      "healthScore": { "type": "integer" },
      "creditsText": { "type": "string" },
      "license": { "type": "string" },
      "sourceName": { "type": "string" },
      "pricePerServing": { "type": "number" },
      "extendedIngredients": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "integer" },
            "aisle": { "type": "string" },
            "image": { "type": "string" },
            "consistency": { "type": "string" },
            "name": { "type": "string" },
            "nameClean": { "type": "string" },
            "original": { "type": "string" },
            "originalName": { "type": "string" },
            "amount": { "type": "number" },
            "unit": { "type": "string" },
            "meta": { "type": "array", "items": {} },
            "measures": {
              "type": "object",
              "properties": {
                "us": {
                  "type": "object",
                  "properties": {
                    "amount": { "type": "number" },
                    "unitShort": { "type": "string" },
                    "unitLong": { "type": "string" }
                  }
                },
                "metric": {
                  "type": "object",
                  "properties": {
                    "amount": { "type": "number" },
                    "unitShort": { "type": "string" },
                    "unitLong": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      },
      "id": { "type": "integer" },
      "title": { "type": "string" },
      "readyInMinutes": { "type": "integer" },
      "servings": { "type": "integer" },
      "sourceUrl": { "type": "string", "format": "uri" },
      "image": { "type": "string", "format": "uri" },
      "imageType": { "type": "string" },
      "summary": { "type": "string" },
      "cuisines": {
        "type": "array",
        "items": { "type": "string" }
      },
      "dishTypes": {
        "type": "array",
        "items": { "type": "string" }
      },
      "diets": {
        "type": "array",
        "items": { "type": "string" }
      },
      "occasions": { "type": "array", "items": { "type": "string" } },
      "winePairing": {
        "type": "object",
        "properties": {
          "pairedWines": { "type": "array", "items": { "type": "string" } },
          "pairingText": { "type": "string" },
          "productMatches": { "type": "array" }
        }
      },
      "instructions": { "type": "string" },
      "analyzedInstructions": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "steps": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "number": { "type": "integer" },
                  "step": { "type": "string" },
                  "ingredients": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": { "type": "integer" },
                        "name": { "type": "string" },
                        "localizedName": { "type": "string" },
                        "image": { "type": "string" }
                      }
                    }
                  },
                  "equipment": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": { "type": "integer" },
                        "name": { "type": "string" },
                        "localizedName": { "type": "string" },
                        "image": { "type": "string" }
                      }
                    }
                  },
                  "length": {
                    "type": "object",
                    "properties": {
                      "number": { "type": "integer" },
                      "unit": { "type": "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "originalId": { "type": "string", "nullable": true },
      "spoonacularScore": { "type": "number" },
      "spoonacularSourceUrl": { "type": "string", "format": "uri" }
    },
} 

export const SEARCH_RECIPE_OPTIONS = {
    schema: {
        description: 'Returns a single recipe based on the search terms',
        querystring: {
          search: {
            type: 'string',
            description: 'Comma-separated terms used in the recipe search',
          },
        },
        response: { 200: { $ref: 'recipe' } },
        ...CONTENT_TYPE_JSON,
    },
    config: {
        secured: true
    }
}
