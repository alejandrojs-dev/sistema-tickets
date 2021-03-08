import { QueryRunner } from 'typeorm'

export interface ISeederInterface {
  run(queryRunner: QueryRunner): Promise<void>
}
