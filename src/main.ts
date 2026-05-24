import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BusinessErrorFilter } from './core/errors/business-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = configService.getOrThrow<number>('PORT');
  const apiPrefix = configService.getOrThrow<string>('API_PREFIX');
  const graphqlPath = configService.getOrThrow<string>('GRAPHQL_PATH');
  const corsOrigin = configService.getOrThrow<string>('CORS_ORIGIN');

  app.useGlobalFilters(new BusinessErrorFilter());

  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: corsOrigin !== '*',
  });

  app.setGlobalPrefix(apiPrefix, {
    exclude: [
      {
        path: graphqlPath.replace(/^\//, ''),
        method: RequestMethod.ALL,
      },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(port);

  logger.log(`HTTP API is running on http://localhost:${port}/${apiPrefix}`);
  logger.log(`GraphQL is running on http://localhost:${port}${graphqlPath}`);
}
bootstrap();
