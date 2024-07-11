import { FastifyInstance } from 'fastify';
import { controllerGetUsers } from '@controllers/users.controller';

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users', controllerGetUsers);
};
