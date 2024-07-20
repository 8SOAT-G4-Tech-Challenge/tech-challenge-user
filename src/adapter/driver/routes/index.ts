import { FastifyInstance } from 'fastify';

import {
	CustomerService,
	OrderService,
	ProductService,
	UserService,
} from '@application/services';
import {
	CustomerRepositoryImpl,
	OrderRepositoryImpl,
	ProductRepositoryImpl,
	UserRepositoryImpl,
} from '@driven/infra';
import {
	CustomerController,
	OrderController,
	ProductController,
	UserController,
} from '@driver/controllers';

const userRepository = new UserRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const orderRepository = new OrderRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);
const productService = new ProductService(productRepository);
const orderService = new OrderService(orderRepository);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);
const productController = new ProductController(productService);
const orderController = new OrderController(orderService);

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users', userController.getUsers.bind(userController));
	fastify.get(
		'/customers',
		customerController.getCustomers.bind(customerController)
	);
	fastify.get(
		'/customers/property',
		customerController.getCustomerByProperty.bind(customerController)
	);
	fastify.post(
		'/customers',
		customerController.createCustomer.bind(customerController)
	);
	fastify.get(
		'/products',
		productController.getProducts.bind(productController)
	);
	fastify.post(
		'/products/categories',
		productController.createProductCategory.bind(productController)
	);
	fastify.get(
		'/products/categories',
		productController.getProductCategories.bind(productController)
	);
	fastify.get('/orders', orderController.getOrders.bind(orderController));
};
