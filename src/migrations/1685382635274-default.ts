import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1685382635274 implements MigrationInterface {
    name = 'Default1685382635274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "matchs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer)`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "temporary_matchs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer, CONSTRAINT "fk_host_id" FOREIGN KEY ("idhost") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idvisitor") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_matchs"("id", "date", "idhost", "idvisitor") SELECT "id", "date", "idhost", "idvisitor" FROM "matchs"`);
        await queryRunner.query(`DROP TABLE "matchs"`);
        await queryRunner.query(`ALTER TABLE "temporary_matchs" RENAME TO "matchs"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matchs" RENAME TO "temporary_matchs"`);
        await queryRunner.query(`CREATE TABLE "matchs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer)`);
        await queryRunner.query(`INSERT INTO "matchs"("id", "date", "idhost", "idvisitor") SELECT "id", "date", "idhost", "idvisitor" FROM "temporary_matchs"`);
        await queryRunner.query(`DROP TABLE "temporary_matchs"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "matchs"`);
    }

}
