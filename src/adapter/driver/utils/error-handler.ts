import { FastifyInstance, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import createError from 'http-errors';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Error during validation',
			errors: error.flatten().fieldErrors,
		});
	}

	if (error instanceof createError.BadRequest) {
		return reply.status(400).send({ message: error.message });
	}

	return reply.status(500).send({ message: error.message });
};

export function handleError(reply: FastifyReply, error: any): void {
	if (error instanceof createError.HttpError) {
		reply.code(error.statusCode).send({ error: error.name, message: error.message });
	} else {
		reply.code(500).send({ error: 'Internal Server Error', message: error.message });
	}
}