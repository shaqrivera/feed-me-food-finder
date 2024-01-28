import { FastifyRequest } from "fastify";

export type SearchRecipesRequest = FastifyRequest<{
    Querystring: {
        search: string,
    }
}>
