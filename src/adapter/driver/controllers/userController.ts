import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { handleError } from '@driver/errorHandler';
import { UserService } from '@services/userService';
import { GetUserResponse } from '@src/core/application/ports/output/users';
import logger from '@src/core/common/logger';

import { UserDto, UserUpdateDto } from '../schemas/userSchema';

export class UserController {
	private readonly userService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	async getUsers(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info('Listing users');
			const users: GetUserResponse[] = await this.userService.getUsers();
			reply.code(StatusCodes.OK).send(users);
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for users';
			logger.error(`${errorMessage}: ${JSON.stringify(error)}`);
			handleError(req, reply, error);
		}
	}

	async getUserById(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			const { id } = req.params;
			logger.info(`Listing user by ID: ${id}`);
			const user = await this.userService.getUserById(id);
			if (!user) {
				reply.code(StatusCodes.NOT_FOUND).send({
					error: 'Not Found',
					message: 'User not found',
				});
				return;
			}
			reply.code(StatusCodes.OK).send(user);
		} catch (error) {
			const errorMessage = 'Unexpected error when listing user by ID';
			logger.error(`${errorMessage}: ${JSON.stringify(error)}`);
			handleError(req, reply, error);
		}
	}

	async getUserByEmail(
		req: FastifyRequest<{ Params: { email: string } }>,
		reply: FastifyReply,
	) {
		try {
			const { email } = req.params;
			logger.info(`Listing user by email: ${email}`);
			const user = await this.userService.getUserByEmail(email);
			if (!user) {
				reply.code(StatusCodes.NOT_FOUND).send({
					error: 'Not Found',
					message: 'User not found',
				});
				return;
			}
			reply.code(StatusCodes.OK).send(user);
		} catch (error) {
			const errorMessage = 'Unexpected error when listing user by email';
			logger.error(`${errorMessage}: ${JSON.stringify(error)}`);
			handleError(req, reply, error);
		}
	}

	async createUser(
		req: FastifyRequest<{ Body: UserDto }>,
		reply: FastifyReply,
	) {
		try {
			logger.info('Creating user...');
			const user = req.body;
			const createdUser = await this.userService.createUser(user);
			logger.info(`User created with ID: ${createdUser.id}`);
			reply.code(StatusCodes.CREATED).send(createdUser);
		} catch (error) {
			const errorMessage = 'Unexpected error when creating user';
			logger.error(`${errorMessage}: ${JSON.stringify(error)}`);
			handleError(req, reply, error);
		}
	}

	async updateUser(
		req: FastifyRequest<{ Params: { id: string }; Body: UserUpdateDto }>,
		reply: FastifyReply,
	) {
		try {
			const { id } = req.params;
			const user = req.body;
			logger.info(`Updating user with ID: ${id}`);
			const updatedUser = await this.userService.updateUser(id, user);
			reply.code(StatusCodes.OK).send(updatedUser);
		} catch (error) {
			const errorMessage = 'Unexpected error when updating user';
			logger.error(`${errorMessage}: ${JSON.stringify(error)}`);
			handleError(req, reply, error);
		}
	}

	async deleteUser(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			const { id } = req.params;
			logger.info(`Deleting user with ID: ${id}`);
			await this.userService.deleteUser(id);
			reply.code(StatusCodes.NO_CONTENT).send();
		} catch (error) {
			const errorMessage = 'Unexpected error when deleting user';
			logger.error(`${errorMessage}: ${JSON.stringify(error)}`);
			handleError(req, reply, error);
		}
	}
}
