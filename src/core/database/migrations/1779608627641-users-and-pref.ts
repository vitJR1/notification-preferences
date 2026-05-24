import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1779608627641 implements MigrationInterface {
    name = 'Migration1779608627641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_notification_preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "notification_type" character varying NOT NULL, "channel" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "quiet_hours_start" character varying, "quiet_hours_end" character varying, "timezone" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c7eba94a9de2586d3518b71376a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0f980da1b0f72aa3a50e8a9970" ON "users_notification_preferences" ("user_id", "notification_type", "channel") `);
        await queryRunner.query(`ALTER TABLE "users_notification_preferences" ADD CONSTRAINT "FK_0fb981abfd9a7df0d20a184edd8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notification_preferences" DROP CONSTRAINT "FK_0fb981abfd9a7df0d20a184edd8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f980da1b0f72aa3a50e8a9970"`);
        await queryRunner.query(`DROP TABLE "users_notification_preferences"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
