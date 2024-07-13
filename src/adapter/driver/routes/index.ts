import { CustomerController } from '@controllers/customerController';
import { UserController } from '@controllers/userController';
import { ProductController } from '../controllers/productController';
import { CustomerRepositoryImpl } from '@driven/infra/customerRepositoryImpl';
import { UserRepositoryImpl } from '@driven/infra/userRepositoryImpl';
import { ProductRepositoryImpl } from '@driven/infra/productRepositoryImpl';
import { CustomerService } from '@services/customerService';
import { UserService } from '@services/userService';
import { ProductService } from '@services/productService';
import { FastifyInstance } from 'fastify';

const userRepository = new UserRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();
const productRepository = new ProductRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);
const productService = new ProductService(productRepository);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);
const productController = new ProductController(productService);

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users', userController.getUsers.bind(userController));
	fastify.get('/customers', customerController.getCustomers.bind(customerController));
	fastify.get('/customers/property', customerController.getCustomerByProperty.bind(customerController));
	fastify.post('/customers', customerController.createCustomer.bind(customerController));
	fastify.get('/products', productController.getProducts.bind(productController));
	fastify.post('/products/categories', productController.createProductCategory.bind(productController));
	fastify.get('/products/categories', productController.getProductCategories.bind(productController));
};
