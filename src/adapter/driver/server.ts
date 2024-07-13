import { routes } from '@routes/index';
import fastify from 'fastify';

import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { errorHandler } from './utils/errorHandler';
import logger from '@driver/utils/logger'

export const app = fastify();

app.register(fastifyCors, {
	origin: '*',
});

app.register(fastifySwagger, {
	swagger: {
		consumes: ['application/json'],
		produces: ['application/json'],
		info: {
			title: 'FIAP - Tech Challenge',
			description:
				'Especificações da API para o back-end da aplicação de restaurante FIAP Tech Challenge.',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
	routePrefix: '/docs',
});

app.register(routes);

app.setErrorHandler(errorHandler);

async function run() {
	await app.ready();

	await app.listen({
		port: Number(process.env.API_PORT) || 3333,
		host: '0.0.0.0',
	});

	logger.info('Documentation running at http://localhost:3333/docs');
}

run();
