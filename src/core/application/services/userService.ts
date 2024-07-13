import { User } from '@models/user';
import { UserRepository } from '@ports/userRepository';
import createError from 'http-errors';

export class UserService {
	constructor(private readonly userRepository: UserRepository) { }

	async getUsers(): Promise<User[]> {
		try {
			const costumers = await this.userRepository.getUsers();
			return costumers;
		} catch (error) {
            if (error instanceof createError.HttpError) {
                throw error;
            } else {
                console.error(error);
                throw new createError.InternalServerError(`An unexpected error occurred while fetching users from the database: ${error.message}`);
            }
		}
	}
}
