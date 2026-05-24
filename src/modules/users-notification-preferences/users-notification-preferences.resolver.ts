import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersNotificationPreferencesService } from './users-notification-preferences.service';
import { UsersNotificationPreference } from './entities/users-notification-preference.entity';
import { CreateUsersNotificationPreferenceInput } from './dto/create-users-notification-preference.input';
import { UpdateUsersNotificationPreferenceInput } from './dto/update-users-notification-preference.input';

@Resolver(() => UsersNotificationPreference)
export class UsersNotificationPreferencesResolver {
  constructor(private readonly usersNotificationPreferencesService: UsersNotificationPreferencesService) {}

  @Mutation(() => UsersNotificationPreference)
  createUsersNotificationPreference(@Args('createUsersNotificationPreferenceInput') createUsersNotificationPreferenceInput: CreateUsersNotificationPreferenceInput) {
    return this.usersNotificationPreferencesService.create(createUsersNotificationPreferenceInput);
  }

  @Query(() => [UsersNotificationPreference], { name: 'usersNotificationPreferences' })
  findAll() {
    return this.usersNotificationPreferencesService.findAll();
  }

  @Query(() => UsersNotificationPreference, { name: 'usersNotificationPreference' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersNotificationPreferencesService.findOne(id);
  }

  @Mutation(() => UsersNotificationPreference)
  updateUsersNotificationPreference(@Args('updateUsersNotificationPreferenceInput') updateUsersNotificationPreferenceInput: UpdateUsersNotificationPreferenceInput) {
    return this.usersNotificationPreferencesService.update(updateUsersNotificationPreferenceInput.id, updateUsersNotificationPreferenceInput);
  }

  @Mutation(() => UsersNotificationPreference)
  removeUsersNotificationPreference(@Args('id', { type: () => Int }) id: number) {
    return this.usersNotificationPreferencesService.remove(id);
  }
}
