import { AxiosInstance } from 'axios'
import { YelpConfig } from '../../domain/config'
import { TitanTextG1LiteService } from '../bedrock/TitanTextG1LiteService';
import { Restaurant } from './entities/Restaurant';

const yelpApiKey = YelpConfig.apiKey

export class RestaurantService {
    constructor(private readonly httpClient: AxiosInstance, private readonly titanTextG1LiteService: TitanTextG1LiteService){}

    async search(zipCode: string, searchValue: string) {
        const yelpLink = 'https://api.yelp.com/v3/businesses/search?location='+zipCode+'&term='+searchValue;
    try {
        const {status, data} = await this.httpClient.get(yelpLink, {
            headers: {
                'Authorization': `Bearer ${yelpApiKey}`,
                'Content-Type': 'application/json'
            }
        })
        if(status !== 200) {
            throw new Error(`Error: ${status} response code from the restaurant list API call`)
        }
        const restaurants: Restaurant[] = data.businesses.map(Restaurant.restore)
        const suggestedRestaurant = await this.titanTextG1LiteService.suggestRestaurant(restaurants, searchValue)
        return suggestedRestaurant
    } catch (error) {
        console.log(error)
    }
    }
}