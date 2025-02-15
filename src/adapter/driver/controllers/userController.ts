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
			logger.info('[USER CONTROLLER] Listing users');
			const users: GetUserResponse[] = await this.userService.getUsers();
			reply.code(StatusCodes.OK).send(users);
		} catch (error) {
			handleError(req, reply, error);
		}
	}

	async getUserById(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply
	) {
		try {
			const { id } = req.params;
			logger.info(`[USER CONTROLLER] Listing user by ID: ${id}`);
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
			handleError(req, reply, error);
		}
	}

	async getUserByEmail(
		req: FastifyRequest<{ Params: { email: string } }>,
		reply: FastifyReply
	) {
		try {
			const { email } = req.params;
			logger.info(`[USER CONTROLLER] Listing user by email: ${email}`);
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
			handleError(req, reply, error);
		}
	}

	async createUser(
		req: FastifyRequest<{ Body: UserDto }>,
		reply: FastifyReply
	) {
		try {
			logger.info('[USER CONTROLLER] Creating user...');
			const user = req.body;
			const createdUser = await this.userService.createUser(user);
			logger.info(`[USER CONTROLLER] User created with ID: ${createdUser.id}`);
			reply.code(StatusCodes.CREATED).send(createdUser);
		} catch (error) {
			handleError(req, reply, error);
		}
	}

	async updateUser(
		req: FastifyRequest<{ Params: { id: string }; Body: UserUpdateDto }>,
		reply: FastifyReply
	) {
		try {
			const { id } = req.params;
			const user = req.body;
			logger.info(`[USER CONTROLLER] Updating user with ID: ${id}`);
			const updatedUser = await this.userService.updateUser(id, user);
			reply.code(StatusCodes.OK).send(updatedUser);
		} catch (error) {
			handleError(req, reply, error);
		}
	}

	async deleteUser(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply
	) {
		try {
			const { id } = req.params;
			logger.info(`[USER CONTROLLER] Deleting user with ID: ${id}`);
			await this.userService.deleteUser(id);
			reply.code(StatusCodes.NO_CONTENT).send();
		} catch (error) {
			handleError(req, reply, error);
		}
	}
}
