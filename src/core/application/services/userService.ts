import { prisma } from '@src/adapter/driven/infra/lib/prisma';
import { User } from '@models/user';
import { UserRepository } from '@src/core/application/ports/userRepository';

// export const serviceGetUsers = async (): Promise<User[]> => {
// 	try {
// 		const users = await prisma.user.findMany({
// 			select: {
// 				id: true,
// 				name: true,
// 				email: true,
// 			},
// 		});
// 		return users;
// 	} catch (error) {
// 		throw new Error('Error fetching users from the database');
// 	}
// };

export class UserService {
	constructor(private readonly userRepository: UserRepository) { }
	async getUserByCpf(cpf: string): Promise<User> {
        return this.userRepository.getUserByCpf(cpf);
    }
}
