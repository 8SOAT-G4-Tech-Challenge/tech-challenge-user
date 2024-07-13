import { UserRepository } from '@ports/userRepository';
import { User } from '@models/user';
import { prisma } from '@driven/infra/lib/prisma';

export class UserRepositoryImpl implements UserRepository {
    async getUserByCpf(cpf: string): Promise<User> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    cpf: cpf,
                },
            });
            if (user) {
                return user;
            } else {
                throw new Error('Not found user: ' + cpf);
            }
        } catch (error) {
            throw new Error('Error fetching users from the database');
        }
    }
}