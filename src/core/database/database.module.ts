import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        port: configService.getOrThrow<number>('DATABASE_PORT'),
        username: configService.getOrThrow<string>('DATABASE_USER'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        ssl: configService.getOrThrow<boolean>('DATABASE_SSL'),
        synchronize: configService.getOrThrow<boolean>('DATABASE_SYNCHRONIZE'),
        migrationsRun: configService.getOrThrow<boolean>(
          'DATABASE_MIGRATIONS_RUN',
        ),
        logging: configService.getOrThrow<boolean>('DATABASE_LOGGING'),
        entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
        migrations: [join(__dirname, './migrations/*{.ts,.js}')],
        migrationsTableName: 'typeorm_migrations',
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
