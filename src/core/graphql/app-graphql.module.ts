import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { unwrapResolverError } from '@apollo/server/errors';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { GraphQLFormattedError } from 'graphql';
import { join } from 'node:path';
import { BusinessError } from '../errors/business-error';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ApolloDriverConfig => {
        const enableLandingPage = configService.getOrThrow<boolean>(
          'GRAPHQL_LANDING_PAGE',
        );

        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          path: configService.getOrThrow<string>('GRAPHQL_PATH'),
          playground: false,
          introspection: configService.getOrThrow<boolean>(
            'GRAPHQL_INTROSPECTION',
          ),
          csrfPrevention: configService.getOrThrow<boolean>(
            'GRAPHQL_CSRF_PREVENTION',
          ),
          cache: 'bounded',
          plugins: [
            enableLandingPage
              ? ApolloServerPluginLandingPageLocalDefault({ embed: true })
              : ApolloServerPluginLandingPageDisabled(),
          ],
          formatError: (
            formattedError: GraphQLFormattedError,
            error: unknown,
          ): GraphQLFormattedError => {
            const originalError = unwrapResolverError(error);

            if (originalError instanceof BusinessError) {
              return {
                ...formattedError,
                message: originalError.message,
                extensions: {
                  ...formattedError.extensions,
                  code: originalError.code,
                  statusCode: originalError.statusCode,
                },
              };
            }

            return formattedError;
          },
        };
      },
    }),
  ],
})
export class AppGraphqlModule {}
