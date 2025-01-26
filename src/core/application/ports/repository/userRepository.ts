import { UserDto, UserUpdateDto } from '@src/adapter/driver/schemas/userSchema';

import { GetUserResponse } from '../output/users';

export interface UserRepository {
	getUsers(): Promise<GetUserResponse[]>;
	getUserById(id: string): Promise<GetUserResponse | null>;
	getUserByEmail(email: string): Promise<GetUserResponse | null>;
	createUser(user: UserDto): Promise<GetUserResponse>;
	updateUser(id: string, user: UserUpdateDto): Promise<GetUserResponse>;
	deleteUser(id: string): Promise<void>;
}
