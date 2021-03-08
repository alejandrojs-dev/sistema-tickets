import { MigrationInterface, QueryRunner } from 'typeorm'
import DataBaseSeeder from '../seeders/DataBaseSeeder'

export class SeedDatabase1598449646288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const databaseSeeder = new DataBaseSeeder()
      await databaseSeeder.run()
    } catch (error) {
      console.error(error)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
