import { StatusCodes } from 'http-status-codes';

import { UserRepository } from '@ports/repository/userRepository';
import {
	UserDto,
	userSchema,
	UserUpdateDto,
	userUpdateSchema,
} from '@src/adapter/driver/schemas/userSchema';
import logger from '@src/core/common/logger';

import { InvalidUserException } from '../exceptions/invalidUserException';
import { GetUserResponse } from '../ports/output/users';

export class UserService {
	private readonly userRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async getUsers(): Promise<GetUserResponse[]> {
		logger.info('Listing users');
		const users: GetUserResponse[] = await this.userRepository.getUsers();
		return users;
	}

	async getUserById(id: string): Promise<GetUserResponse | null> {
		logger.info(`Listing user by ID: ${id}`);
		const user: GetUserResponse | null = await this.userRepository.getUserById(
			id,
		);
		return user;
	}

	async getUserByEmail(email: string): Promise<GetUserResponse | null> {
		logger.info(`Listing user by email: ${email}`);
		const user: GetUserResponse | null =
			await this.userRepository.getUserByEmail(email);
		return user;
	}

	async createUser(user: UserDto): Promise<GetUserResponse> {
		userSchema.parse(user);

		const existingUser: GetUserResponse | null =
			await this.userRepository.getUserByEmail(user.email);
		if (existingUser) {
			throw new InvalidUserException('A user with this email already exists.');
		}

		logger.info('Creating user...');

		const createdUser: GetUserResponse = await this.userRepository.createUser(
			user,
		);

		logger.info(`User created with ID: ${createdUser.id}`);

		return createdUser;
	}

	async updateUser(id: string, user: UserUpdateDto): Promise<GetUserResponse> {
		console.log('id -> ', id);
		console.log('body -> ', user);
		const { success } = userUpdateSchema.safeParse(user);
		console.log('success -> ', success);
		if (!success || !id) {
			throw new InvalidUserException(
				"Can't update user without providing a valid data.",
				StatusCodes.BAD_REQUEST,
			);
		}

		logger.info(`Updating user with ID: ${id}`);

		const updatedUser: GetUserResponse = await this.userRepository.updateUser(
			id,
			user,
		);

		return updatedUser;
	}

	async deleteUser(id: string): Promise<void> {
		const existingUser: GetUserResponse | null =
			await this.userRepository.getUserById(id);

		if (!existingUser) {
			throw new InvalidUserException('User not found.', StatusCodes.NOT_FOUND);
		}

		logger.info(`Deleting user with ID: ${id}`);

		await this.userRepository.deleteUser(id);
	}
}
