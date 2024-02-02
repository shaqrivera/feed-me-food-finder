import { FastifyInstance } from "fastify";
import { RecipeService } from "../../domain/recipes/RecipeService";
import { AxiosInstance } from 'axios'
import { RecipeController } from "./recipes/RecipeController";
import { RECIPE_SCHEMA, SEARCH_RECIPE_OPTIONS } from "./recipes/schemas";
import { RestaurantService } from "../../domain/restaurants/RestaurantService";
import { RestaurantController } from "./restaurants/RestaurantController";
import { RESTAURANT_SCHEMA, SEARCH_RESTAURANT_OPTIONS } from "./restaurants/schemas";
import { TitanTextG1LiteService } from "../../domain/bedrock/TitanTextG1LiteService";
import { BedrockRuntime } from "../../domain/bedrock/BedrockRuntime";
import { AWSConfig, titanTextModelConfig } from "../../domain/config";
import { FoundationModel } from "../../domain/bedrock/FoundationModels";
import { BedrockEmbeddings } from "../../domain/bedrock/BedrockEmbeddings";

export const registerRoutes = (fastify: FastifyInstance, axios: AxiosInstance) => {
    //Titan G1 Lite
    const bedrockRuntime = new BedrockRuntime(AWSConfig)
    const bedrockEmbeddings = new BedrockEmbeddings(AWSConfig)
    const titanTextG1LiteService = new TitanTextG1LiteService(bedrockRuntime, titanTextModelConfig, bedrockEmbeddings)

    // Recipes
    const recipeService = new RecipeService(axios)
    const recipeController = new RecipeController(recipeService)
 
    fastify.addSchema(RECIPE_SCHEMA)
    fastify.get('/recipes', SEARCH_RECIPE_OPTIONS, recipeController.search.bind(recipeController))

    // Restaurants
    const restaurantService = new RestaurantService(axios, titanTextG1LiteService)
    const restaurantController = new RestaurantController(restaurantService)

    fastify.addSchema(RESTAURANT_SCHEMA)
    fastify.get('/restaurants', SEARCH_RESTAURANT_OPTIONS, restaurantController.search.bind(restaurantController))
}   
