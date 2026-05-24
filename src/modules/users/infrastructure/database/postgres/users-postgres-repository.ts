import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_NOTIFICATION_PREFERENCES } from 'src/modules/users-notification-preferences/domain/default-preferences';
import { UsersNotificationPreference } from 'src/modules/users-notification-preferences/domain/entities/users-notification-preference.entity';
import {
  CreateUser,
  UpdateUser,
} from 'src/modules/users/domain/repository/types';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UsersRepository } from '../../../domain/repository/users-repository';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';

@Injectable()
export class UsersPostgresRepository implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUser: CreateUser): Promise<User> {
    return this.dataSource.transaction(async (entityManager) => {
      const usersRepository = entityManager.getRepository(User);
      const usersNotificationPreferencesRepository =
        entityManager.getRepository(UsersNotificationPreference);

      const user = await usersRepository.save(
        usersRepository.create(createUser),
      );

      const defaultPreferences = DEFAULT_NOTIFICATION_PREFERENCES.map(
        (defaultPreference) =>
          usersNotificationPreferencesRepository.create({
            userId: user.id,
            notificationType: defaultPreference.notificationType,
            channel: defaultPreference.channel,
            enabled: defaultPreference.enabled,
          }),
      );

      await usersNotificationPreferencesRepository.save(defaultPreferences);

      return user;
    });
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
