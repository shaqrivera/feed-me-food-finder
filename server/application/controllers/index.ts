import { FastifyInstance } from "fastify";
import { RecipeService } from "../../domain/recipes/RecipeService";
import { AxiosInstance } from 'axios'
import { RecipeController } from "./recipes/RecipeController";
import { RECIPE_SCHEMA, SEARCH_RECIPE_OPTIONS } from "./recipes/schemas";
import { RestaurantService } from "../../domain/restaurants/RestaurantService";
import { RestaurantController } from "./restaurants/RestaurantController";
import { RESTAURANT_SCHEMA, SEARCH_RESTAURANT_OPTIONS } from "./restaurants/schemas";

export const registerRoutes = (fastify: FastifyInstance, axios: AxiosInstance) => {
    // Recipes
    const recipeService = new RecipeService(axios)
    const recipeController = new RecipeController(recipeService)
 
    fastify.addSchema(RECIPE_SCHEMA)
    fastify.get('/recipes', SEARCH_RECIPE_OPTIONS, recipeController.search.bind(recipeController))

    // Restaurants
    const restaurantService = new RestaurantService(axios)
    const restaurantController = new RestaurantController(restaurantService)

    fastify.addSchema(RESTAURANT_SCHEMA)
    fastify.get('/restaurants', SEARCH_RESTAURANT_OPTIONS, restaurantController.search.bind(restaurantController))
}   
