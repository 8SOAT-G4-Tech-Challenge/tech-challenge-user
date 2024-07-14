import { prisma } from '@driven/infra/lib/prisma';
import { UserRepository } from '@ports/userRepository';
import { User } from '@src/core/domain/user';

export class UserRepositoryImpl implements UserRepository {
	async getUsers(): Promise<User[]> {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				password: false,
				sessionToken: false,
				isAdmin: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return users;
	}
}
