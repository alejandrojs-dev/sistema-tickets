import { MigrationInterface, QueryRunner } from 'typeorm'
import tables from '../tables'
import eTicketsTableForeignKeys from '../foreignKeys/eTicketsTableForeignKeys'
import cTicketSubGroupsTableForeignKeys from '../foreignKeys/cTicketSubGroupsTableForeignKeys'
import dUserTicketSubGroupTableForeignKeys from '../foreignKeys/dUserSubGroupAuthTicketForeignKeys'
import dUserTicketGroupTableForeignKeys from '../foreignKeys/dUserTicketGroupTableForeignKeys'
import bTicketsTableForeignKeys from '../foreignKeys/bTicketsTableForeignKeys'
import dUserAuthTicketForeignKeys from '../foreignKeys/dUserAuthTicketTableForeignKeys'
import ticketIndexesTable from '../indexes/ticketsIndexesTable'

export class CreateTicketsTables1598108610274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      for (const table of tables) {
        await queryRunner.createTable(table, true)
      }
      await this.createForeignKeys(queryRunner)
      await this.createIndexes(queryRunner)
    } catch (error) {
      console.log(error)
    }
  }

  public async createForeignKeys(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createForeignKeys('c_ticket_subgroups', cTicketSubGroupsTableForeignKeys)
      await queryRunner.createForeignKeys('e_tickets', eTicketsTableForeignKeys)
      await queryRunner.createForeignKeys('d_user_ticket_group', dUserTicketGroupTableForeignKeys)
      await queryRunner.createForeignKeys('d_user_subgroup_auth_ticket', dUserTicketSubGroupTableForeignKeys)
      await queryRunner.createForeignKeys('b_tickets', bTicketsTableForeignKeys)
      await queryRunner.createForeignKeys('d_user_auth_ticket', dUserAuthTicketForeignKeys)
    } catch (error) {
      console.log(error)
    }
  }

  public async createIndexes(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createIndices('e_tickets', ticketIndexesTable)
    } catch (error) {
      console.log(error)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('d_user_auth_ticket', true, true)
      await queryRunner.dropTable('d_user_subgroup_auth_ticket', true, true)
      await queryRunner.dropTable('b_tickets', true, true)
      await queryRunner.dropTable('d_user_ticket_group', true)
      await queryRunner.dropTable('e_tickets', true, true)
      await queryRunner.dropTable('c_ticket_subgroups', true, true)
      await queryRunner.dropTable('c_ticket_groups', true)
      await queryRunner.dropTable('c_ticket_types', true)
      await queryRunner.dropTable('c_ticket_status', true)
      await queryRunner.dropTable('c_priorities', true)
      await queryRunner.dropTable('c_users_api', true)
    } catch (error) {
      console.log(error)
    }
  }
}
