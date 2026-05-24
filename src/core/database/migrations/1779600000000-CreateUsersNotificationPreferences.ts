import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersNotificationPreferences1779600000000
  implements MigrationInterface
{
  name = 'CreateUsersNotificationPreferences1779600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query(`
      CREATE TABLE "users_notification_preferences" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" varchar NOT NULL,
        "notification_type" varchar NOT NULL,
        "channel" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "quiet_hours_start" varchar,
        "quiet_hours_end" varchar,
        "timezone" varchar,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users_notification_preferences_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_notification_preferences_user_type_channel"
          UNIQUE ("user_id", "notification_type", "channel")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users_notification_preferences"');
  }
}
