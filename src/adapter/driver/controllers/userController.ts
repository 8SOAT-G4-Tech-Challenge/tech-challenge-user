import { User } from '@prisma/client';
import { UserService } from '@services/userService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleError } from '../utils/error-handler';

export class UserController {
	constructor(private readonly userService: UserService) { }
	
	async getUsers(req: FastifyRequest, reply: FastifyReply) {
		try {
			const customers: User[] = await this.userService.getUsers();
			reply.code(201).send(customers);
		} catch (error) {
			handleError(reply, error);
		}
	}
}
