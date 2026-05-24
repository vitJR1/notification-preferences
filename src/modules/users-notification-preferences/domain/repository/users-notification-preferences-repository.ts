import { UsersNotificationPreference } from '../entities/users-notification-preference.entity';
import {
  CreateUsersNotificationPreference,
  PreferenceIdentity,
  UpdateUsersNotificationPreference,
  UpsertUsersNotificationPreference,
} from './types';

export interface UsersNotificationPreferencesRepository {
  createEntity(
    createUsersNotificationPreference: CreateUsersNotificationPreference,
  ): UsersNotificationPreference;
  create(
    createUsersNotificationPreference: CreateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference>;
  update(
    updateUsersNotificationPreference: UpdateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference>;
  findAndCount(): Promise<[UsersNotificationPreference[], number]>;
  findOne(id: string): Promise<UsersNotificationPreference>;
  findByUserId(userId: string): Promise<UsersNotificationPreference[]>;
  findByIdentity(
    identity: PreferenceIdentity,
  ): Promise<UsersNotificationPreference | null>;
  upsertPreference(
    upsertUsersNotificationPreference: UpsertUsersNotificationPreference,
  ): Promise<UsersNotificationPreference>;
  delete(id: string): Promise<void>;
}
