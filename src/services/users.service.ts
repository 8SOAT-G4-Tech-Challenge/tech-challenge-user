import { prisma } from '@lib/prisma';
import { User } from '@models/users.model';

export const serviceGetUsers = async (): Promise<User[]> => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			},
		});
		return users;
	} catch (error) {
		throw new Error('Error fetching users from the database');
	}
};
