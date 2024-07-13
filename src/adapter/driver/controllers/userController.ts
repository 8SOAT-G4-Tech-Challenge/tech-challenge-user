import { User } from '@prisma/client';
import { UserService } from '@services/userService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleError } from '@driver/utils/errorHandler';
import { StatusCodes } from 'http-status-codes';

export class UserController {
	constructor(private readonly userService: UserService) { }
	
	async getUsers(req: FastifyRequest, reply: FastifyReply) {
		try {
			const customers: User[] = await this.userService.getUsers();
			reply.code(StatusCodes.CREATED).send(customers);
		} catch (error) {
			handleError(req, reply, error);
		}
	};
}
