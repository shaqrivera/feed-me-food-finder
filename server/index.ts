// ESM
import Fastify from 'fastify'
import cors from '@fastify/cors';
import { registerRoutes } from './application/controllers'
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie'; 
import 'dotenv/config'
import axios from 'axios'

const { SESSION_SECRET, COOKIE_NAME } = process.env
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})

const httpClient = axios.create({ timeout: 30000 })

fastify.register(fastifyCookie);
fastify.register(fastifySession, {secret: SESSION_SECRET || 'a secret with minimum length of 32 characters', cookieName: COOKIE_NAME || 'feed-me', cookie: { secure: false, maxAge: 86400}});

const corsOptions = {
  origin: 'http://localhost:5173',  //Your Client, do not write '*'
  credentials: true,
};
fastify.register(cors, corsOptions)

fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'Feed me API',
      description: 'The API routes available to the Feed Me client',
      version: '0.1.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  }
}).then(() => {
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
  })
  registerRoutes(fastify, httpClient)
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
