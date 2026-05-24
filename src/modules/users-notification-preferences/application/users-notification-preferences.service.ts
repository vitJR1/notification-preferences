import { Inject, Injectable } from '@nestjs/common';
import { usersNotificationPreferencesRepositoryToken } from '../domain/repository/users-notification-preferences-repository-token';
import { UsersNotificationPreferencesRepository } from '../domain/repository/users-notification-preferences-repository';
import { CreateUsersNotificationPreferenceInput } from '../interface/graphql/dto/create-users-notification-preference.input';
import { UpdateUsersNotificationPreferenceInput } from '../interface/graphql/dto/update-users-notification-preference.input';

@Injectable()
export class UsersNotificationPreferencesService {
  constructor(
    @Inject(usersNotificationPreferencesRepositoryToken)
    private readonly repo: UsersNotificationPreferencesRepository,
  ) {}

  create(
    createUsersNotificationPreferenceInput: CreateUsersNotificationPreferenceInput,
  ) {
    return this.repo.create(createUsersNotificationPreferenceInput);
  }

  async findAll() {
    const [items, count] = await this.repo.findAndCount();

    return {
      items,
      info: {
        count,
      },
    };
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  update(
    id: string,
    updateUsersNotificationPreferenceInput: UpdateUsersNotificationPreferenceInput,
  ) {
    return this.repo.update({ ...updateUsersNotificationPreferenceInput, id });
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
