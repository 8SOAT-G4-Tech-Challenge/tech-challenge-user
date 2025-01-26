import 'dotenv/config';

import fastify from 'fastify';

import logger from '@common/logger';
import { errorHandler } from '@driver/errorHandler';
import fastifyCors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { routes } from '@routes/index';

export const app = fastify();

app.register(fastifyCors, {
	origin: '*',
});

app.register(fastifySwagger, {
	openapi: {
		openapi: '3.0.1',
	},
	swagger: {
		consumes: ['application/json'],
		produces: ['application/json'],
		info: {
			title: 'FIAP - Tech Challenge - Microserviço User',
			description:
				'Especificações da API do Microserviço User da aplicação de restaurante FIAP Tech Challenge.',
			version: '1.0.0',
		},
	},
});

app.register(fastifySwaggerUI, {
	routePrefix: '/docs',
});

app.register(helmet, {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			objectSrc: ["'none'"],
			upgradeInsecureRequests: [],
		},
	},
	frameguard: {
		action: 'deny',
	},
	referrerPolicy: {
		policy: 'no-referrer',
	},
	xssFilter: true,
	noSniff: true,
});

app.register(routes);

app.setErrorHandler(errorHandler);

async function run() {
	await app.ready();

	await app.listen({
		port: Number(process.env.API_PORT) || 3334,
		host: '0.0.0.0',
	});

	logger.info('Documentation running at http://localhost:3334/docs');
}

run();
