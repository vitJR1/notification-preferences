import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUser,
  UpdateUser,
} from 'src/modules/users/domain/repository/types';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UsersRepository } from '../../../domain/repository/users-repository';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';

@Injectable()
export class UsersPostgresRepository implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUser: CreateUser): Promise<User> {
    const user = this.usersRepository.create(createUser);

    return this.usersRepository.save(user);
  }

  async update(updateUser: UpdateUser): Promise<User> {
    await this.usersRepository.update(updateUser.id, updateUser);

    return this.findOne(updateUser.id);
  }

  async findAndCount(): Promise<[User[], number]> {
    const [users, count] = await this.usersRepository.findAndCount();

    return [users, count];
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (!result.affected) {
      throw new UserNotFoundError();
    }
  }
}
