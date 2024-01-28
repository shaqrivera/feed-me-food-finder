import { FastifyReply } from "fastify"
import { InternalErrorResponse } from "../../../utils/responses"
import { RecipeService } from "../../../domain/recipes/RecipeService"
import { SearchRecipesRequest } from './SearchRecipesRequest'

export class RecipeController {
    constructor(private readonly recipeService: RecipeService){}

    async search(req: SearchRecipesRequest, res: FastifyReply) {
        const { search } = req.query
        try {
            return await this.recipeService.search(search)
        } catch (error) {
            return InternalErrorResponse(res)
        }
        
    }
}