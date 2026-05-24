import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBusinessErrors } from '../../../../core/errors/api-business-errors.decorator';
import { UsersNotificationPreferenceNotFoundError } from '../../domain/errors/users-notification-preference-not-found.error';
import { UsersNotificationPreferencesService } from '../../application/users-notification-preferences.service';
import { CreateUsersNotificationPreferenceInput } from './dto/create-users-notification-preference.input';
import { PaginatedUsersNotificationPreferencesObject } from './dto/paginated-users-notification-preferences.object';
import { UpdateUsersNotificationPreferenceInput } from './dto/update-users-notification-preference.input';
import { UsersNotificationPreferenceObject } from './dto/users-notification-preference.object';

@Resolver(() => UsersNotificationPreferenceObject)
export class UsersNotificationPreferencesResolver {
  constructor(
    private readonly usersNotificationPreferencesService: UsersNotificationPreferencesService,
  ) {}

  @Mutation(() => UsersNotificationPreferenceObject)
  createUsersNotificationPreference(
    @Args('createUsersNotificationPreferenceInput')
    createUsersNotificationPreferenceInput: CreateUsersNotificationPreferenceInput,
  ) {
    return this.usersNotificationPreferencesService.create(
      createUsersNotificationPreferenceInput,
    );
  }

  @Query(() => PaginatedUsersNotificationPreferencesObject, {
    name: 'usersNotificationPreferences',
  })
  findAll() {
    return this.usersNotificationPreferencesService.findAll();
  }

  @Query(() => UsersNotificationPreferenceObject, {
    name: 'usersNotificationPreference',
  })
  @ApiBusinessErrors(UsersNotificationPreferenceNotFoundError)
  findOne(@Args('id') id: string) {
    return this.usersNotificationPreferencesService.findOne(id);
  }

  @Mutation(() => UsersNotificationPreferenceObject)
  @ApiBusinessErrors(UsersNotificationPreferenceNotFoundError)
  updateUsersNotificationPreference(
    @Args('updateUsersNotificationPreferenceInput')
    updateUsersNotificationPreferenceInput: UpdateUsersNotificationPreferenceInput,
  ) {
    return this.usersNotificationPreferencesService.update(
      updateUsersNotificationPreferenceInput.id,
      updateUsersNotificationPreferenceInput,
    );
  }

  @Mutation(() => UsersNotificationPreferenceObject)
  @ApiBusinessErrors(UsersNotificationPreferenceNotFoundError)
  removeUsersNotificationPreference(@Args('id') id: string) {
    return this.usersNotificationPreferencesService.remove(id);
  }
}
