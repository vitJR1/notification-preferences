import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersNotificationPreference } from '../../../domain/entities/users-notification-preference.entity';
import { UsersNotificationPreferenceNotFoundError } from '../../../domain/errors/users-notification-preference-not-found.error';
import {
  CreateUsersNotificationPreference,
  PreferenceIdentity,
  UpdateUsersNotificationPreference,
  UpsertUsersNotificationPreference,
} from '../../../domain/repository/types';
import { UsersNotificationPreferencesRepository } from '../../../domain/repository/users-notification-preferences-repository';

@Injectable()
export class UsersNotificationPreferencesPostgresRepository
  implements UsersNotificationPreferencesRepository
{
  constructor(
    @InjectRepository(UsersNotificationPreference)
    private readonly usersNotificationPreferencesRepository: Repository<UsersNotificationPreference>,
  ) {}

  createEntity(
    createUsersNotificationPreference: CreateUsersNotificationPreference,
  ): UsersNotificationPreference {
    return this.usersNotificationPreferencesRepository.create(
      createUsersNotificationPreference,
    );
  }

  async create(
    createUsersNotificationPreference: CreateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference> {
    const usersNotificationPreference = this.createEntity(
      createUsersNotificationPreference,
    );

    return this.usersNotificationPreferencesRepository.save(
      usersNotificationPreference,
    );
  }

  async update(
    updateUsersNotificationPreference: UpdateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference> {
    const { id, ...updates } = updateUsersNotificationPreference;

    await this.findOne(id);

    if (Object.keys(updates).length > 0) {
      await this.usersNotificationPreferencesRepository.update(id, updates);
    }

    return this.findOne(id);
  }

  async findAndCount(): Promise<[UsersNotificationPreference[], number]> {
    return this.usersNotificationPreferencesRepository.findAndCount();
  }

  async findOne(id: string): Promise<UsersNotificationPreference> {
    const usersNotificationPreference =
      await this.usersNotificationPreferencesRepository.findOneBy({ id });

    if (!usersNotificationPreference) {
      throw new UsersNotificationPreferenceNotFoundError();
    }

    return usersNotificationPreference;
  }

  async findByUserId(userId: string): Promise<UsersNotificationPreference[]> {
    return this.usersNotificationPreferencesRepository.find({
      where: { userId },
    });
  }

  async findByIdentity({
    userId,
    notificationType,
    channel,
  }: PreferenceIdentity): Promise<UsersNotificationPreference | null> {
    return this.usersNotificationPreferencesRepository.findOneBy({
      userId,
      notificationType,
      channel,
    });
  }

  async upsertPreference(
    upsertUsersNotificationPreference: UpsertUsersNotificationPreference,
  ): Promise<UsersNotificationPreference> {
    const existing = await this.findByIdentity(
      upsertUsersNotificationPreference,
    );

    if (existing) {
      await this.usersNotificationPreferencesRepository.update(
        existing.id,
        upsertUsersNotificationPreference,
      );

      return this.findOne(existing.id);
    }

    return this.create(upsertUsersNotificationPreference);
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersNotificationPreferencesRepository.delete(id);

    if (!result.affected) {
      throw new UsersNotificationPreferenceNotFoundError();
    }
  }
}
