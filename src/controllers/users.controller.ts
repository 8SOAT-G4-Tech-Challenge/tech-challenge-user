import { BadRequest } from '@routes/_errors/bad-request';
import { serviceGetUsers } from '@services/users.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export const controllerGetUsers = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const users = await serviceGetUsers();
		if (!users) {
			throw new BadRequest('No users found');
		}
		reply.send(users);
	} catch (err) {
		reply.send(err); // Errors will be handled by the global error handler
	}
};
