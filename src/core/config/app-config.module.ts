import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().port().default(3000),
        API_PREFIX: Joi.string().default('api'),
        CORS_ORIGIN: Joi.string().default('*'),
        GRAPHQL_PATH: Joi.string().default('/graphql'),
        GRAPHQL_INTROSPECTION: Joi.boolean().default(true),
        GRAPHQL_LANDING_PAGE: Joi.boolean().default(true),
        GRAPHQL_CSRF_PREVENTION: Joi.boolean().default(true),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().port().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_SSL: Joi.boolean().default(false),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
        DATABASE_MIGRATIONS_RUN: Joi.boolean().default(false),
        DATABASE_LOGGING: Joi.boolean().default(false),
      }),
    }),
  ],
})
export class AppConfigModule {}
