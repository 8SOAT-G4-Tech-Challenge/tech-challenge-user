import { GetUserResponse } from '@application/ports/output/users';
import { prisma } from '@driven/infra/lib/prisma';
import { UserRepository } from '@ports/repository/userRepository';
import { UserDto, UserUpdateDto } from '@src/adapter/driver/schemas/userSchema';

export class UserRepositoryImpl implements UserRepository {
	async getUsers(): Promise<GetUserResponse[]> {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				sessionToken: true,
				isAdmin: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		return users;
	}

	async getUserById(id: string): Promise<GetUserResponse | null> {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				sessionToken: true,
				isAdmin: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		return user;
	}

	async getUserByEmail(email: string): Promise<GetUserResponse | null> {
		const user = await prisma.user.findFirst({
			where: { email },
			select: {
				id: true,
				name: true,
				email: true,
				sessionToken: true,
				isAdmin: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		return user;
	}

	async createUser(user: UserDto): Promise<GetUserResponse> {
		const createdUser = await prisma.user.create({
			data: user,
		});

		return createdUser;
	}

	async updateUser(id: string, user: UserUpdateDto): Promise<GetUserResponse> {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: user,
		});

		return updatedUser;
	}

	async deleteUser(id: string): Promise<void> {
		await prisma.user.delete({
			where: { id },
		});
	}
}
