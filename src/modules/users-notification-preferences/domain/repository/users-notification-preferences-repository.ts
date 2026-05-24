import { UsersNotificationPreference } from '../entities/users-notification-preference.entity';
import {
  CreateUsersNotificationPreference,
  UpdateUsersNotificationPreference,
} from './types';

export interface UsersNotificationPreferencesRepository {
  create(
    createUsersNotificationPreference: CreateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference>;
  update(
    updateUsersNotificationPreference: UpdateUsersNotificationPreference,
  ): Promise<UsersNotificationPreference>;
  findAndCount(): Promise<[UsersNotificationPreference[], number]>;
  findOne(id: string): Promise<UsersNotificationPreference>;
  delete(id: string): Promise<void>;
}
