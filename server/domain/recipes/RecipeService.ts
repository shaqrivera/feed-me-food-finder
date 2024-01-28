import { AxiosInstance } from 'axios'
import { SpoonacularConfig } from '../../domain/config'

const spoonApiKey = SpoonacularConfig.apiKey

export class RecipeService {
    constructor(private readonly httpClient: AxiosInstance){}

    async search(searchValue: string) {
    const spoonacularLink = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='+spoonApiKey+'&query='+searchValue;
    try {
        const {status: recipeListStatus, data: recipeListData} = await this.httpClient.get(spoonacularLink)
        if(recipeListStatus !== 200) {
            throw new Error(`Error: ${recipeListStatus} response code from the recipe list API call`)
        }
        let recipeInformationLink = 'https://api.spoonacular.com/recipes/'+recipeListData.results[Math.floor(Math.random()*recipeListData.results.length)].id+'/information?apiKey='+spoonApiKey;
        const { status: recipeInformationStatus, data: recipeInformationData } = await this.httpClient.get(recipeInformationLink)
        if(recipeInformationStatus !== 200) {
            throw new Error(`Error: ${recipeInformationStatus} response code from the recipe information API call`)
        }
        return recipeInformationData
    } catch (error) {
        console.log(error)
    }
    }
}