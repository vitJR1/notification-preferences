import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../../application/users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserObject } from './dto/user.object';
import { PaginatedUsersObject } from './dto/paginated-users.object';
import { ApiBusinessErrors } from '../../../../core/errors/api-business-errors.decorator';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UsersNotificationPreferencesService } from '../../../users-notification-preferences/application/users-notification-preferences.service';
import { UserWithNotificationPreferencesObject } from './dto/user-with-notification-preferences.object';

@Resolver(() => UserObject)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersNotificationPreferencesService: UsersNotificationPreferencesService,
  ) {}

  @Mutation(() => UserObject)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => PaginatedUsersObject, { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserWithNotificationPreferencesObject, { name: 'user' })
  @ApiBusinessErrors(UserNotFoundError)
  async findOne(@Args('id') id: string) {
    const user = await this.usersService.findOne(id);
    const notificationPreferences =
      await this.usersNotificationPreferencesService.getUserPreferences(
        user.id,
      );

    return {
      ...user,
      notificationPreferences,
    };
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
