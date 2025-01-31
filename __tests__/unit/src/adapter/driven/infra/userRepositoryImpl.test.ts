import { UserRepositoryImpl } from '@src/adapter/driven/infra';
import { prisma } from '@src/adapter/driven/infra/lib/prisma';

import { UserMockBuilder } from '../../../../mocks/user.mock-builder';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

jest.mock('@src/core/application/services/cacheService', () => ({
	cacheService: {
		get: jest.fn(),
		set: jest.fn(),
		del: jest.fn(),
	},
}));

describe('UserRepositoryImpl -> Test', () => {
	let repository: UserRepositoryImpl;

	beforeEach(() => {
		repository = new UserRepositoryImpl();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUsers', () => {
		test('should get users', async () => {
			const users = [new UserMockBuilder().withDefaultValues().build()];

			jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users as any);

			const response = await repository.getUsers();

			expect(response).toEqual(users);
		});
	});

	describe('getUserById', () => {
		test('should get user by id', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const userId = user.id;

			jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user as any);

			const response = await repository.getUserById(userId);

			expect(response).toEqual(user);
		});

		test('should return null if user not found', async () => {
			const userId = 'non-existing-id';

			jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

			const response = await repository.getUserById(userId);

			expect(response).toBeNull();
		});
	});

	describe('getUserByEmail', () => {
		test('should get user by email', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const { email } = user;

			jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(user as any);

			const response = await repository.getUserByEmail(email);

			expect(response).toEqual(user);
		});

		test('should return null if user not found', async () => {
			const email = 'non-existing-email@example.com';

			jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);

			const response = await repository.getUserByEmail(email);
			expect(response).toBeNull();
		});
	});

	describe('createUser', () => {
		test('should create a new user', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.user, 'create').mockResolvedValue(user as any);

			const response = await repository.createUser(user);

			expect(response).toEqual(user);
		});
	});

	describe('updateUser', () => {
		test('should update user', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const updatedUser = { ...user, name: 'Updated Name' };

			jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser as any);

			const response = await repository.updateUser(user.id, updatedUser);

			expect(response).toEqual(updatedUser);
		});
	});

	describe('deleteUser', () => {
		test('should delete user', async () => {
			const user = new UserMockBuilder().withDefaultValues().build();
			const userId = user.id;

			jest.spyOn(prisma.user, 'delete').mockResolvedValue(user as any);

			await repository.deleteUser(userId);

			expect(prisma.user.delete).toHaveBeenCalledWith({
				where: { id: userId },
			});
		});
	});
});
