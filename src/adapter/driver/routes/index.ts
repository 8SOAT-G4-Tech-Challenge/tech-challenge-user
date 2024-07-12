import { FastifyInstance } from 'fastify';
import { UserController } from '@driver/userController';
import { UserService } from '@src/core/application/services/userService';
import { UserRepositoryImpl } from '@src/adapter/driven/infra/userRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/users/:cpf', userController.getUserByCpf.bind(userController));
};
