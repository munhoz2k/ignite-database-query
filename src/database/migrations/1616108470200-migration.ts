import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1616108470200 implements MigrationInterface {
  name = 'migration1616108470200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );


    await queryRunner.query(
      'CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),"title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))',
    );


    await queryRunner.query(
      'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9247c2n982498c89c92" PRIMARY KEY ("id"))'
    );


    await queryRunner.query(
      'CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY, "userId" uuid NOT NULL, "gamesId" uuid NOT NULL)'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_lmcs983rmc342u45324uia2ad" ON "orders" ("gamesId")'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_s93fsof9s3nfs0sjs3ildja89" ON "orders" ("userId")'
    )
    await queryRunner.query(
      'ALTER TABLE "orders" ADD CONSTRAINT "FK_lmcs983rmc342u45324uia2ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )
    await queryRunner.query(
      'ALTER TABLE "orders" ADD CONSTRAINT "FK_s93fsof9s3nfs0sjs3ildam82" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )


    await queryRunner.query(
      'CREATE TABLE "users_games_games" ("usersId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_cd4067d574477fd5c7693bc7872" PRIMARY KEY ("usersId", "gamesId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_e5263d029d8644de829aae5c35" ON "users_games_games" ("usersId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_934b0d8f9d0084c97d3876ad32" ON "users_games_games" ("gamesId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_e5263d029d8644de829aae5c35a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );


    await queryRunner.query(
      'CREATE TABLE "games_genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY, "gamesId" uuid NOT NULL, "genresId" uuid NOT NULL)'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ap2i9jdao8jdkjiodpoa2oa2en" ON "games_genres" ("gamesId")'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ma28a2d89a8d2a2miaodio2jio" ON "games_genres" ("genresId")'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres" ADD CONSTRAINT "FK_ap2i9jdao8jdkjiodpoa2oa2en" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres" ADD CONSTRAINT "FK_ma28a2d89a8d2a2miaodio2jio" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "orders" DROP CONSTRAINT "FK_lmcs983rmc342u45324uia2ad"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders" DROP CONSTRAINT "FK_s93fsof9s3nfs0sjs3ildam82"',
    );
    await queryRunner.query('DROP INDEX "IDX_lmcs983rmc342u45324uia2ad"');
    await queryRunner.query('DROP INDEX "IDX_s93fsof9s3nfs0sjs3ildja89"');
    await queryRunner.query('DROP TABLE "orders"');

    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_e5263d029d8644de829aae5c35a"',
    );
    await queryRunner.query('DROP INDEX "IDX_934b0d8f9d0084c97d3876ad32"');
    await queryRunner.query('DROP INDEX "IDX_e5263d029d8644de829aae5c35"');
    await queryRunner.query('DROP TABLE "users_games_games"');
    await queryRunner.query('DROP TABLE "games"');
    await queryRunner.query('DROP TABLE "users"');

    await queryRunner.query(
      'ALTER TABLE "games_genres" DROP CONSTRAINT "FK_ap2i9jdao8jdkjiodpoa2oa2en"',
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres" DROP CONSTRAINT "FK_ma28a2d89a8d2a2miaodio2jio"',
    );
    await queryRunner.query('DROP INDEX "IDX_ap2i9jdao8jdkjiodpoa2oa2en"');
    await queryRunner.query('DROP INDEX "IDX_ma28a2d89a8d2a2miaodio2jio"');
    await queryRunner.query('DROP TABLE "games_genres"');
  }
}
