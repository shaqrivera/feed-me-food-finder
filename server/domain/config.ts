import 'dotenv/config'
const { SPOON_API_KEY, YELP_API_KEY } = process.env

export const SpoonacularConfig = {
    apiKey: SPOON_API_KEY
}

export const YelpConfig = {
    apiKey: YELP_API_KEY
}
