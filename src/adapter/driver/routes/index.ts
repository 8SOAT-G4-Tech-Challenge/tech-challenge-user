import { FastifyInstance } from 'fastify';
import { UserController } from '@controllers/userController';
import { CustomerController } from '@controllers/customerController';
import { UserService } from '@services/userService';
import { CustomerService } from '@services/customerService';
import { UserRepositoryImpl } from '@driven/infra/userRepositoryImpl';
import { CustomerRepositoryImpl } from '@driven/infra/customerRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const customerRepositoryImpl = new CustomerRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepositoryImpl);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users/:cpf', userController.getUserByCpf.bind(userController));
	fastify.get('/customers', customerController.getCustomers.bind(customerController));
	fastify.get('/customer/id/:id', customerController.getCustomerById.bind(customerController));
	fastify.get('/customer/cpf/:cpf', customerController.getCustomerByCpf.bind(customerController));
	fastify.post('/customers', customerController.createCustomer.bind(customerController));
};
