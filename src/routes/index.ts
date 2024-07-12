import { controllerGetUsers } from '@controllers/users.controller';
import {
	controllerCreateCustomer,
	controllerGetCustomerByCpf,
	controllerGetCustomerById,
	controllerGetCustomers,
} from '@src/controllers/customers.controller';
import { FastifyInstance } from 'fastify';

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users', controllerGetUsers);
	fastify.get('/customers', controllerGetCustomers);
	fastify.get('/customer/id/:id', controllerGetCustomerById);
	fastify.get('/customer/cpf/:cpf', controllerGetCustomerByCpf);
	fastify.post('/customers', controllerCreateCustomer);
};
