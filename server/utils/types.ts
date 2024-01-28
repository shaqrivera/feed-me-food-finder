import { ObjectId } from "@fastify/mongodb";
import { FastifySessionObject } from "@fastify/session";
import { FastifyRouteConfig } from "fastify/types/route";

export type WithId<T> = T & {
    _id: ObjectId,
}

export type Session = FastifySessionObject & { authenticated: boolean | undefined }

export type RouteConfig = FastifyRouteConfig & { secured: boolean }
