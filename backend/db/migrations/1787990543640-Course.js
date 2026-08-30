/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Course1787990543640 {
    name = 'Course1787990543640'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "COURSE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "max_participants" integer NOT NULL, "meeting_url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "skill_id" uuid, CONSTRAINT "PK_1dcd712a4d39dcfd9d46ca0ae11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_7c9837d128ab474cb3d409b448d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_10d952a5e55998cf12f448fcfab" FOREIGN KEY ("skill_id") REFERENCES "SKILL"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_10d952a5e55998cf12f448fcfab"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_7c9837d128ab474cb3d409b448d"`);
        await queryRunner.query(`DROP TABLE "COURSE"`);
    }
}
