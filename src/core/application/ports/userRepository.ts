import { User } from '@models/user';

export interface UserRepository {
    getUserByCpf(cpf: string): Promise<User>;
}