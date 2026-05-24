import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../../application/users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserObject } from './dto/user.object';
import { PaginatedUsersObject } from './dto/paginated-users.object';
import { ApiBusinessErrors } from '../../../../core/errors/api-business-errors.decorator';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

@Resolver(() => UserObject)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserObject)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => PaginatedUsersObject, { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserObject, { name: 'user' })
  @ApiBusinessErrors(UserNotFoundError)
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserObject)
  @ApiBusinessErrors(UserNotFoundError)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserObject)
  @ApiBusinessErrors(UserNotFoundError)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
