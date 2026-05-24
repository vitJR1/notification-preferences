import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersNotificationPreferencesModule } from './modules/users-notification-preferences/users-notification-preferences.module';
import { AppConfigModule } from './core/config/app-config.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UsersModule,
    UsersNotificationPreferencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
