import { FastifyInstance } from 'fastify';

import { CustomerService, UserService } from '@application/services';
import { CustomerRepositoryImpl, UserRepositoryImpl } from '@driven/infra';
import { CustomerController, UserController } from '@driver/controllers';

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
		userController.getUsers.bind(userController),
	);
	fastify.get(
		'/admin/users/:id',
		userController.getUserById.bind(userController),
	);
	fastify.get(
		'/admin/users/email/:email',
		userController.getUserByEmail.bind(userController),
	);
	fastify.post(
		'/admin/users',
		userController.createUser.bind(userController),
	);
	fastify.put(
		'/admin/users/:id',
		userController.updateUser.bind(userController),
	);
	fastify.delete(
		'/admin/users/:id',
		userController.deleteUser.bind(userController),
	);
	fastify.get(
		'/admin/customers',
		customerController.getCustomers.bind(customerController),
	);
	fastify.get(
		'/totem/customers/property',
		customerController.getCustomerByProperty.bind(customerController),
	);
	fastify.post(
		'/totem/customers',
		customerController.createCustomer.bind(customerController),
	);
	fastify.delete(
		'/admin/customers/:id',
		customerController.deleteCustomer.bind(customerController),
	);
};
