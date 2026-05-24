import { Injectable } from '@nestjs/common';
import { CreateUsersNotificationPreferenceInput } from './dto/create-users-notification-preference.input';
import { UpdateUsersNotificationPreferenceInput } from './dto/update-users-notification-preference.input';

@Injectable()
export class UsersNotificationPreferencesService {
  create(createUsersNotificationPreferenceInput: CreateUsersNotificationPreferenceInput) {
    return 'This action adds a new usersNotificationPreference';
  }

  findAll() {
    return `This action returns all usersNotificationPreferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersNotificationPreference`;
  }

  update(id: number, updateUsersNotificationPreferenceInput: UpdateUsersNotificationPreferenceInput) {
    return `This action updates a #${id} usersNotificationPreference`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersNotificationPreference`;
  }
}
