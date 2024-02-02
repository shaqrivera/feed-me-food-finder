import 'dotenv/config'
import type { Optional } from '../utils/types'
const { SPOON_API_KEY, YELP_API_KEY, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env

export type ApiKeyConfigType = {
    apiKey: Optional<string>
}

export const SpoonacularConfig: ApiKeyConfigType = {
    apiKey: SPOON_API_KEY
}

export const YelpConfig: ApiKeyConfigType = {
    apiKey: YELP_API_KEY
}

export type AWSConfigType = {
    region: Optional<string>,
    credentials: {
        accessKeyId: Optional<string>,
        secretAccessKey: Optional<string>
    }
}

export const AWSConfig: AWSConfigType = {
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
}

export type TitanTextModelConfig = {
    maxTokenCount: number,
    stopSequences: string[],
    temperature: number,
    topP: number,
}

export const titanTextModelConfig = {
    maxTokenCount: 4096,
    stopSequences: [],
    temperature: 0,
    topP: 1,
};
