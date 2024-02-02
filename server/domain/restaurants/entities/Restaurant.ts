import { RestaurantCategory } from './RestaurantCategory'
import { Location } from './Location'
export class Restaurant { 
    constructor(
            readonly id: string,
            readonly alias: string,
            readonly name: string, 
            readonly imageUrl: string,
            readonly isClosed: boolean,
            readonly url: string,
            readonly reviewCount: number,
            readonly categories: RestaurantCategory[],
            readonly rating: number,
            readonly coordinates: {
              latitude: number,
              longitude: number,
            },
            readonly transactions: string[],
            readonly  price: string,
            readonly location: Location,
            readonly phone: string,
            readonly displayPhone: string,
            readonly distance: number,
          
    ){}

    static create(
        id: string,
        alias: string,
        name: string, 
        imageUrl: string,
        isClosed: boolean,
        url: string,
        reviewCount: number,
        categories: RestaurantCategory[],
        rating: number,
        coordinates: {
            latitude: number,
            longitude: number,
        },
        transactions: string[],
         price: string,
        location: Location,
        phone: string,
        displayPhone: string,
        distance: number,
    ): Restaurant {
        return new Restaurant(
            id, 
            alias, 
            name, 
            imageUrl, 
            isClosed, 
            url, 
            reviewCount, 
            categories, 
            rating, 
            coordinates, 
            transactions, 
            price, 
            location, 
            phone, 
            displayPhone, 
            distance)
    }

    static restore(data: any): Restaurant {
        return new Restaurant(
            data.id, 
            data.alias, 
            data.name, 
            data.imageUrl, 
            data.isClosed, 
            data.url, 
            data.reviewCount, 
            data.categories.map(RestaurantCategory.restore), 
            data.rating, 
            data.coordinates,
            data.transactions, 
            data.price, 
            Location.restore(data.location), 
            data.phone, 
            data.displayPhone, 
            data.distance
        )
    }
}