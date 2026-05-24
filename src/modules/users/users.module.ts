import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersResolver } from './interface/graphql/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { usersRepositoryToken } from './domain/repository/users-repository-token';
import { UsersPostgresRepository } from './infrastructure/database/postgres/users-postgres-repository';
import { UsersNotificationPreferencesModule } from '../users-notification-preferences/users-notification-preferences.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersNotificationPreferencesModule,
  ],
  providers: [
    {
      useClass: UsersPostgresRepository,
      provide: usersRepositoryToken,
    },
    UsersResolver,
    UsersService,
  ],
})
export class UsersModule {}
