import { UserController } from '@src/adapter/driver/controllers/userController';
import logger from '@src/core/common/logger';

import { UserMockBuilder } from '../../../../mocks/user.mock-builder';

describe('UserController -> Test', () => {
	let controller: UserController;
	let userService: any;

	beforeEach(() => {
		userService = {
			getUsers: jest.fn(),
			getUserById: jest.fn(),
			getUserByEmail: jest.fn(),
			createUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
		};

		controller = new UserController(userService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUsers', () => {
		test('should reply 200 and list all users', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const user = new UserMockBuilder().withDefaultValues().build();

			const req = {};
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			userService.getUsers.mockResolvedValue([user]);

			await controller.getUsers(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith([user]);
			expect(loggerSpy).toHaveBeenCalledWith('Listing users');
		});

		test('should fail to list users', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = { url: '/get-users-mock' };
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			userService.getUsers.mockRejectedValue({ message: 'error' });

			await controller.getUsers(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when listing for users: {"message":"error"}',
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/get-users-mock',
				status: 500,
			});
		});
	});

	describe('getUserById', () => {
		test('should reply 200 and return user by id', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const user = new UserMockBuilder().withDefaultValues().build();
			const req = { params: { id: user.id } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			userService.getUserById.mockResolvedValue(user);

			await controller.getUserById(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(user);
			expect(loggerSpy).toHaveBeenCalledWith(`Listing user by ID: ${user.id}`);
		});

		test('should fail to get user by id', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				params: { id: 'non-existing-id' },
				url: '/get-user-by-id-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			userService.getUserById.mockRejectedValue({ message: 'error' });

			await controller.getUserById(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when listing user by ID: {"message":"error"}',
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/get-user-by-id-mock',
				status: 500,
			});
		});

		test('should reply 404 when user is not found by id', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const req = { params: { id: 'non-existing-id' } };
			const reply = {
				code: jest.fn().mockReturnThis(),
				send: jest.fn(),
			};

			userService.getUserById.mockResolvedValue(null);

			await controller.getUserById(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(404);
			expect(reply.send).toHaveBeenCalledWith({
				error: 'Not Found',
				message: 'User not found',
			});
			expect(loggerSpy).toHaveBeenCalledWith(
				'Listing user by ID: non-existing-id',
			);
		});
	});
	describe('getUserByEmail', () => {
		test('should reply 200 and return user by email', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const user = new UserMockBuilder().withDefaultValues().build();
			const req = { params: { email: user.email } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			userService.getUserByEmail.mockResolvedValue(user);

			await controller.getUserByEmail(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(user);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Listing user by email: ${user.email}`,
			);
		});

		test('should reply 404 when user is not found by email', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const req = { params: { email: 'non-existing-email@example.com' } };
			const reply = {
				code: jest.fn().mockReturnThis(),
				send: jest.fn(),
			};

			userService.getUserByEmail.mockResolvedValue(null);

			await controller.getUserByEmail(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(404);
			expect(reply.send).toHaveBeenCalledWith({
				error: 'Not Found',
				message: 'User not found',
			});
			expect(loggerSpy).toHaveBeenCalledWith(
				'Listing user by email: non-existing-email@example.com',
			);
		});

		test('should fail to get user by email', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				params: { email: 'non-existing-email@example.com' },
				url: '/get-user-by-email-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			userService.getUserByEmail.mockRejectedValue({ message: 'error' });

			await controller.getUserByEmail(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when listing user by email: {"message":"error"}',
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/get-user-by-email-mock',
				status: 500,
			});
		});
	});

	describe('createUser', () => {
		test('should reply 201 and create a new user', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const user = new UserMockBuilder().withDefaultValues().build();
			const req = { body: user };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			userService.createUser.mockResolvedValue(user);

			await controller.createUser(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(201);
			expect(reply.send).toHaveBeenCalledWith(user);
			expect(loggerSpy).toHaveBeenCalledWith('Creating user...');
			expect(loggerSpy).toHaveBeenCalledWith(
				`User created with ID: ${user.id}`,
			);
		});

		test('should fail to create user', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				body: { email: 'invalid-email' },
				url: '/create-user-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			userService.createUser.mockRejectedValue({ message: 'error' });

			await controller.createUser(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when creating user: {"message":"error"}',
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/create-user-mock',
				status: 500,
			});
		});
	});

	describe('updateUser', () => {
		test('should reply 200 and update user', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const user = new UserMockBuilder().withDefaultValues().build();
			const updatedUser = { ...user, name: 'Updated Name' };
			const req = { params: { id: user.id }, body: updatedUser };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			userService.updateUser.mockResolvedValue(updatedUser);

			await controller.updateUser(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(updatedUser);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Updating user with ID: ${user.id}`,
			);
		});

		test('should fail to update user', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				params: { id: 'non-existing-id' },
				body: { name: 'Updated Name' },
				url: '/update-user-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			userService.updateUser.mockRejectedValue({ message: 'error' });

			await controller.updateUser(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when updating user: {"message":"error"}',
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/update-user-mock',
				status: 500,
			});
		});
	});

	describe('deleteUser', () => {
		test('should reply 204 and delete user', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const user = new UserMockBuilder().withDefaultValues().build();
			const req = { params: { id: user.id } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			userService.deleteUser.mockResolvedValue();

			await controller.deleteUser(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(204);
			expect(reply.send).toHaveBeenCalled();
			expect(loggerSpy).toHaveBeenCalledWith(
				`Deleting user with ID: ${user.id}`,
			);
		});

		test('should fail to delete user', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				params: { id: 'non-existing-id' },
				url: '/delete-user-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			userService.deleteUser.mockRejectedValue({ message: 'error' });

			await controller.deleteUser(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when deleting user: {"message":"error"}',
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/delete-user-mock',
				status: 500,
			});
		});
	});
});
