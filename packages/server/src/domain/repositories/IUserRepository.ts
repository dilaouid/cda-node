import { User, NewUser, UserColumns } from "../entities/User";

export interface IUserRepository {
    getAllUsers(): Promise<Partial<User>[]>;
    getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>>;
    getUserByUsername(username: string, columns: UserColumns): Promise<Partial<User | undefined>>;
    createUser(user: NewUser): Promise<void>;
    updateUser(user: User): Promise<void>;
}
