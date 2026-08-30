/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Coach1788013844587 {
    name = 'Coach1788013844587'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "COACH" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "experience_years" integer NOT NULL, "description" text NOT NULL, "profile_image_url" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "skill_ids" uuid array NOT NULL DEFAULT '{}', "user_id" uuid, CONSTRAINT "REL_9970257bf1fb6ac7b8c2b13263" UNIQUE ("user_id"), CONSTRAINT "PK_86122345454fa1389314e7a74be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "COACH" ADD CONSTRAINT "FK_9970257bf1fb6ac7b8c2b13263c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "COACH" DROP CONSTRAINT "FK_9970257bf1fb6ac7b8c2b13263c"`);
        await queryRunner.query(`DROP TABLE "COACH"`);
    }
}
