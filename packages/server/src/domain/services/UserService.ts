import bcrypt from 'bcrypt';
import { IUserRepository } from '../repositories/IUserRepository';
import { NewUser, UserColumns } from '../entities/User';

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getUserByUsername(username: string, columns: UserColumns) {
        return this.userRepository.getUserByUsername(username, columns);
    }

    async getUserById(id: string, columns: UserColumns) {
        return this.userRepository.getUserById(id, columns);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async createUser(user: NewUser): Promise<void> {
        return this.userRepository.createUser(user);
    }

    async checkUsernameExists(username: string): Promise<boolean> {
        const user = await this.userRepository.getUserByUsername(username, { username: true });
        return !!user;
    }
}
