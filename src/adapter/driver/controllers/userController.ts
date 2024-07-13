import { BadRequest } from '@exceptions/badRequestException';
import { UserService } from '@services/userService';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
	constructor(private readonly userService: UserService) { }
	async getUserByCpf(req: FastifyRequest, res: FastifyReply) {
		try {
			const users = await this.userService.getUserByCpf('12345698710');
			if (!users) {
				throw new BadRequest('No users found');
			}
			res.send(users);
		} catch (err) {
			res.send(err); // Errors will be handled by the global error handler
		}
	}
}
