import { AxiosInstance } from 'axios'
import { YelpConfig } from '../../domain/config'

const yelpApiKey = YelpConfig.apiKey

export class RestaurantService {
    constructor(private readonly httpClient: AxiosInstance){}

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
        const randomRestaurant = data.businesses[Math.floor(Math.random()*data.businesses.length)]
        return randomRestaurant
    } catch (error) {
        console.log(error)
    }
    }
}