import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const getBooleanEnv = (key: string, defaultValue: boolean): boolean => {
  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
};

export default new DataSource({
  type: 'postgres',
  host: getEnv('DATABASE_HOST'),
  port: Number(process.env.DATABASE_PORT ?? 5432),
  username: getEnv('DATABASE_USER'),
  password: getEnv('DATABASE_PASSWORD'),
  database: getEnv('DATABASE_NAME'),
  ssl: getBooleanEnv('DATABASE_SSL', false),
  synchronize: false,
  logging: getBooleanEnv('DATABASE_LOGGING', false),
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/core/database/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
});
