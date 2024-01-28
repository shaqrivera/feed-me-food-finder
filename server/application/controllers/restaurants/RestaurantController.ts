import { FastifyReply } from "fastify"
import { InternalErrorResponse } from "../../../utils/responses"
import { RestaurantService } from "../../../domain/restaurants/RestaurantService"
import { SearchRestaurantsRequest } from './SearchRestaurantsRequest'

export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService){}

    async search(req: SearchRestaurantsRequest, res: FastifyReply) {
        const { search, zipCode } = req.query
        try {
            return await this.restaurantService.search(zipCode, search)
        } catch (error) {
            return InternalErrorResponse(res)
        }
    }
}