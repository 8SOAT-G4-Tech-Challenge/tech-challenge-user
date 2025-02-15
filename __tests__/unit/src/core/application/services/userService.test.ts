import { ZodError } from 'zod';

import { UserService } from '@application/services/userService';
import { InvalidUserException } from '@exceptions/invalidUserException';

import { UserMockBuilder } from '../../../../mocks/user.mock-builder';

describe('UserService -> Test', () => {
	let service: UserService;
	let mockUserRepository: any;

	beforeEach(() => {
		mockUserRepository = {
			getUsers: jest.fn(),
			getUserById: jest.fn(),
			getUserByEmail: jest.fn(),
			createUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
		};

		service = new UserService(mockUserRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUsers', () => {
		test('should get all users', async () => {
			const users = [new UserMockBuilder().withDefaultValues().build()];

			mockUserRepository.getUsers.mockResolvedValue(users);

			const response = await service.getUsers();

			expect(mockUserRepository.getUsers).toHaveBeenCalled();
			expect(response).toEqual(users);
		});
	});

	describe('getUserById', () => {
		test('should get user by id', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const userId = user.id;
			mockUserRepository.getUserById.mockResolvedValue(user);

			const response = await service.getUserById(userId);

			expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
			expect(response).toEqual(user);
		});

		test('should return null if user not found', async () => {
			const userId = 'non-existing-id';

			mockUserRepository.getUserById.mockResolvedValue(null);

			const response = await service.getUserById(userId);

			expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
			expect(response).toBeNull();
		});
	});

	describe('getUserByEmail', () => {
		test('should get user by email', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const { email } = user;

			mockUserRepository.getUserByEmail.mockResolvedValue(user);

			const response = await service.getUserByEmail(email);

			expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
			expect(response).toEqual(user);
		});

		test('should return null if user not found', async () => {
			const email = 'non-existing-email@example.com';

			mockUserRepository.getUserByEmail.mockResolvedValue(null);

			const response = await service.getUserByEmail(email);

			expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
			expect(response).toBeNull();
		});
	});

	describe('createUser', () => {
		test('should create a new user', async () => {
			const userDto = new UserMockBuilder().withDefaultValues().build();
			const user = { ...userDto };

			mockUserRepository.createUser.mockResolvedValue(user);

			const response = await service.createUser(userDto);

			expect(mockUserRepository.createUser).toHaveBeenCalledWith(userDto);
			expect(response).toEqual(user);
		});

		test('should throw InvalidUserException if user data is invalid', async () => {
			const userDto = new UserMockBuilder().withInvalidValues().build();

			try {
				await service.createUser(userDto);
				fail('Expected method to throw an error');
			} catch (error) {
				expect(error).toBeInstanceOf(ZodError);
			}
		});

		test('should throw ZodError if password is too short', async () => {
			const userDto = new UserMockBuilder()
				.withDefaultValues()
				.withPassword('123')
				.build();

			try {
				await service.createUser(userDto);
				fail('Expected method to throw an error');
			} catch (error) {
				expect(error).toBeInstanceOf(ZodError);
			}
		});
	});

	describe('updateUser', () => {
		test('should update user', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const updatedUser = { ...user, name: 'Updated Name' };

			mockUserRepository.updateUser.mockResolvedValue(updatedUser);

			const response = await service.updateUser(user.id, updatedUser);

			expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
				user.id,
				updatedUser
			);
			expect(response).toEqual(updatedUser);
		});

		test('should throw InvalidUserException if user update data is invalid', async () => {
			const userUpdateDto = new UserMockBuilder().withInvalidValues();

			try {
				await service.updateUser('some-id', userUpdateDto);
				fail('Expected method to throw an error');
			} catch (error) {
				expect(error).toBeInstanceOf(InvalidUserException);
			}
		});
	});

	describe('deleteUser', () => {
		test('should delete user', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const userId = user.id;

			mockUserRepository.getUserById.mockResolvedValue(user);
			mockUserRepository.deleteUser.mockResolvedValue();

			await service.deleteUser(userId);

			expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
			expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);
		});

		test('should throw InvalidUserException if user not found', async () => {
			const userId = 'non-existing-id';

			mockUserRepository.getUserById.mockResolvedValue(null);

			try {
				await service.deleteUser(userId);
				fail('Expected method to throw an error');
			} catch (error) {
				expect(error).toBeInstanceOf(InvalidUserException);
			}
		});
	});
});
