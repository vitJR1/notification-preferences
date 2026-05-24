import { CreateUser, UpdateUser } from './types';
import { User } from '../entities/user.entity';

export interface UsersRepository {
  create(createUser: CreateUser): Promise<User>;
  update(updateUser: UpdateUser): Promise<User>;
  findAndCount(): Promise<[User[], number]>;
  findOne(id: string): Promise<User>;
  delete(id: string): Promise<void>;
}
