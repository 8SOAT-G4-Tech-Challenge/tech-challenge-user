import { CustomerController } from '@controllers/customerController';
import { UserController } from '@controllers/userController';
import { CustomerRepositoryImpl } from '@driven/infra/customerRepositoryImpl';
import { UserRepositoryImpl } from '@driven/infra/userRepositoryImpl';
import { CustomerService } from '@services/customerService';
import { UserService } from '@services/userService';
import { FastifyInstance } from 'fastify';

const userRepository = new UserRepositoryImpl();
const customerRepositoryImpl = new CustomerRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepositoryImpl);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users', userController.getUsers.bind(userController));
	fastify.get('/customers', customerController.getCustomers.bind(customerController));
	fastify.get('/customers/property', customerController.getCustomerByProperty.bind(customerController));
	fastify.post('/customers', customerController.createCustomer.bind(customerController));
};
