import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersNotificationPreferencesService } from './application/users-notification-preferences.service';
import { UsersNotificationPreference } from './domain/entities/users-notification-preference.entity';
import { usersNotificationPreferencesRepositoryToken } from './domain/repository/users-notification-preferences-repository-token';
import { UsersNotificationPreferencesPostgresRepository } from './infrastructure/database/postgres/users-notification-preferences-postgres-repository';
import { UsersNotificationPreferencesResolver } from './interface/graphql/users-notification-preferences.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UsersNotificationPreference])],
  providers: [
    {
      useClass: UsersNotificationPreferencesPostgresRepository,
      provide: usersNotificationPreferencesRepositoryToken,
    },
    UsersNotificationPreferencesResolver,
    UsersNotificationPreferencesService,
  ],
})
export class UsersNotificationPreferencesModule {}
