import { FastifyInstance } from 'fastify';

import { CustomerService, UserService } from '@application/services';
import { CustomerRepositoryImpl, UserRepositoryImpl } from '@driven/infra';
import { CustomerController, UserController } from '@driver/controllers';

import {
	SwaggerCreateCustomers,
	SwaggerDeleteCustomers,
	SwaggerGetCustomers,
	SwaggerGetCustomersProperty,
} from './doc/customer';
import {
	SwaggerCreateUsers,
	SwaggerDeleteUsers,
	SwaggerGetUserByEmail,
	SwaggerGetUserById,
	SwaggerGetUsers,
	SwaggerUpdateUsers,
} from './doc/user';

const userRepository = new UserRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);

// Usem esse site para gerar o swagger a partir do JSON -> https://roger13.github.io/SwagDefGen/
export const routes = async (fastify: FastifyInstance) => {
	fastify.get(
		'/admin/users',
		SwaggerGetUsers,
		userController.getUsers.bind(userController),
	);
	fastify.get(
		'/admin/users/:id',
		SwaggerGetUserById,
		userController.getUserById.bind(userController),
	);
	fastify.get(
		'/admin/users/email/:email',
		SwaggerGetUserByEmail,
		userController.getUserByEmail.bind(userController),
	);
	fastify.post(
		'/admin/users',
		SwaggerCreateUsers,
		userController.createUser.bind(userController),
	);
	fastify.put(
		'/admin/users/:id',
		SwaggerUpdateUsers,
		userController.updateUser.bind(userController),
	);
	fastify.delete(
		'/admin/users/:id',
		SwaggerDeleteUsers,
		userController.deleteUser.bind(userController),
	);
	fastify.get(
		'/admin/customers',
		SwaggerGetCustomers,
		customerController.getCustomers.bind(customerController),
	);
	fastify.get(
		'/totem/customers/property',
		SwaggerGetCustomersProperty,
		customerController.getCustomerByProperty.bind(customerController),
	);
	fastify.post(
		'/totem/customers',
		SwaggerCreateCustomers,
		customerController.createCustomer.bind(customerController),
	);
	fastify.delete(
		'/admin/customers/:id',
		SwaggerDeleteCustomers,
		customerController.deleteCustomer.bind(customerController),
	);
};
