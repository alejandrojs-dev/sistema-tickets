import { TableForeignKey } from 'typeorm'

const dUserAuthTicketForeignKeys: TableForeignKey[] = []

const fkTicketId = new TableForeignKey({
  name: 'fk_d_user_auth_ticket_id',
  columnNames: ['ticket_id'],
  referencedTableName: 'e_tickets',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

const fkUserId = new TableForeignKey({
  name: 'fk_d_user_auth_user_id',
  columnNames: ['user_id'],
  referencedTableName: 'c_users_api',
  referencedColumnNames: ['user_id'],
  deferrable: 'DEFERRABLE',
})

dUserAuthTicketForeignKeys.push(fkTicketId, fkUserId)

export default dUserAuthTicketForeignKeys
