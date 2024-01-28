import { FastifyReply } from "fastify";

export const ForbiddenResponse = (reply: FastifyReply, message = 'Session has insufficient permissions.') => {
    return reply.code(403).send({ error: 'Forbidden', message })
}

export const BadRequestResponse = (reply: FastifyReply, message = 'The payload provided is invalid.') => {
    return reply.code(400).send({ error: 'Bad request', message })
}

export const InternalErrorResponse = (reply: FastifyReply, message = 'There was an internal server error with the request, please try again. If the error persists, please notify an administrator.') => {
    return reply.code(500).send({ error: 'Internal server error', message })
}

export const ResourceNotFoundResponse = (reply: FastifyReply, message = 'The requested resource was not found.') => {
    return reply.code(404).send({ error: 'Resource not found', message })
}
