import { Module } from '@nestjs/common';
import { UsersNotificationPreferencesService } from './users-notification-preferences.service';
import { UsersNotificationPreferencesResolver } from './users-notification-preferences.resolver';

@Module({
  providers: [UsersNotificationPreferencesResolver, UsersNotificationPreferencesService],
})
export class UsersNotificationPreferencesModule {}
