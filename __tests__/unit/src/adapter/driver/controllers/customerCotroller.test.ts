import { CustomerController } from '@src/adapter/driver/controllers/customerController';
import logger from '@src/core/common/logger';

import { CustomerMockBuilder } from '../../../../mocks/customer.mock-builder';

describe('CustomerController -> Test', () => {
	let controller: CustomerController;
	let customerService: any;

	beforeEach(() => {
		customerService = {
			getCustomers: jest.fn(),
			getCustomerByProperty: jest.fn(),
			createCustomer: jest.fn(),
			deleteCustomer: jest.fn(),
		};

		controller = new CustomerController(customerService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getCustomers', () => {
		test('should list all customers and reply 200', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const customer = new CustomerMockBuilder().withDefaultValues().build();

			const req = {};
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			customerService.getCustomers.mockResolvedValue(customer);

			await controller.getCustomers(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(customer);
			expect(loggerSpy).toHaveBeenCalledWith(
				'[CUSTOMER CONTROLLER] Listing customers'
			);
		});

		test('should fail to list all customers', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = { url: '/get-customers-mock' };
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			customerService.getCustomers.mockRejectedValue({ message: 'error' });

			await controller.getCustomers(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'[❌ ERROR HANDLER] Unexpected error: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith(
				JSON.stringify({
					path: '/get-customers-mock',
					status: 500,
					message: 'error',
				})
			);
		});
	});

	describe('getCustomerByProperty', () => {
		test('should reply status 400 when not passing id and cpf', async () => {
			const req = { query: { id: undefined, cpf: undefined } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			await controller.getCustomerByProperty(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(400);
			expect(reply.send).toHaveBeenCalledWith({
				error: 'Bad Request',
				message:
					'Please provide either an ID or a CPF to search for a customer.',
			});
		});

		test('should reply status 400 when passing id and cpf', async () => {
			const req = { query: { id: '1', cpf: '1' } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			await controller.getCustomerByProperty(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(400);
			expect(reply.send).toHaveBeenCalledWith({
				error: 'Bad Request',
				message: 'Please provide either an ID or a CPF, not both.',
			});
		});

		test('should reply status 200 when customer is found', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			const req = { query: { id: '1', cpf: undefined } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			customerService.getCustomerByProperty.mockResolvedValue(customer);

			await controller.getCustomerByProperty(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(customer);
		});

		test('should reply status 404 when customer is not found', async () => {
			const req = { query: { id: '1', cpf: undefined } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			customerService.getCustomerByProperty.mockResolvedValue(undefined);

			await controller.getCustomerByProperty(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(404);
			expect(reply.send).toHaveBeenCalledWith({
				error: 'Not Found',
				message: 'Customer with ID 1 not found',
			});
		});

		test('should fail to get customer', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				url: '/get-customers-mock',
				query: { id: '1', cpf: undefined },
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			customerService.getCustomerByProperty.mockRejectedValue({
				message: 'error',
			});

			await controller.getCustomerByProperty(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'[❌ ERROR HANDLER] Unexpected error: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith(
				JSON.stringify({
					path: '/get-customers-mock',
					status: 500,
					message: 'error',
				})
			);
		});
	});

	describe('createCustomer', () => {
		test('should reply status 201 when customer is created', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const customer = new CustomerMockBuilder().withDefaultValues().build();

			const req = { body: { customer } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			customerService.createCustomer.mockResolvedValue(customer);

			await controller.createCustomer(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(201);
			expect(reply.send).toHaveBeenCalledWith(customer);
			expect(loggerSpy).toHaveBeenCalledWith(
				'[CUSTOMER CONTROLLER] Creating customer'
			);
		});

		test('should fail to create customer', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				url: '/create-customers-mock',
				body: {},
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			customerService.createCustomer.mockRejectedValue({
				message: 'error',
			});

			await controller.createCustomer(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'[❌ ERROR HANDLER] Unexpected error: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith(
				JSON.stringify({
					path: '/create-customers-mock',
					status: 500,
					message: 'error',
				})
			);
		});
	});

	describe('deleteCustomer', () => {
		test('should reply status 200 when customer is deleted', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const req = { params: { id: '1' } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			customerService.deleteCustomer.mockResolvedValue();

			await controller.deleteCustomer(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'Customer successfully deleted',
			});
			expect(loggerSpy).toHaveBeenCalledWith(
				'[CUSTOMER CONTROLLER] Deleting customer'
			);
		});

		test('should fail to delete customer', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				url: '/delete-customers-mock',
				params: { id: '1' },
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			customerService.deleteCustomer.mockRejectedValue({
				message: 'error',
			});

			await controller.deleteCustomer(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'[❌ ERROR HANDLER] Unexpected error: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith(
				JSON.stringify({
					path: '/delete-customers-mock',
					status: 500,
					message: 'error',
				})
			);
		});
	});
});
