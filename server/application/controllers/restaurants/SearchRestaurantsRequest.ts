import { FastifyRequest } from "fastify";

export type SearchRestaurantsRequest = FastifyRequest<{
    Querystring: {
        search: string,
        zipCode: string
    }
}>
