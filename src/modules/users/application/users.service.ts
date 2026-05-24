import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../interface/graphql/dto/create-user.input';
import { UpdateUserInput } from '../interface/graphql/dto/update-user.input';
import { UsersRepository } from '../domain/repository/users-repository';
import { usersRepositoryToken } from '../domain/repository/users-repository-token';

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersRepositoryToken) private readonly repo: UsersRepository,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.repo.create(createUserInput);
  }

  findAll() {
    return this.repo.findAndCount();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.repo.update({ ...updateUserInput, id });
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
