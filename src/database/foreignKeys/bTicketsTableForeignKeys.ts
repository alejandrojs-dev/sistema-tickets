import { TableForeignKey } from 'typeorm'

const bTicketsTableForeignKeys: TableForeignKey[] = []

const fkTicketId = new TableForeignKey({
  name: 'fk_b_ticket_id',
  columnNames: ['ticket_id'],
  referencedTableName: 'e_tickets',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

const fkTicketStatusId = new TableForeignKey({
  name: 'fk_b_ticket_status_id',
  columnNames: ['ticket_status_id'],
  referencedTableName: 'c_ticket_status',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

const fkUserId1 = new TableForeignKey({
  name: 'fk_b_user_id_1',
  columnNames: ['user_id_1'],
  referencedTableName: 'c_users_api',
  referencedColumnNames: ['user_id'],
  deferrable: 'DEFERRABLE',
})

const fkUserId2 = new TableForeignKey({
  name: 'fk_b_user_id_2',
  columnNames: ['user_id_2'],
  referencedTableName: 'c_users_api',
  referencedColumnNames: ['user_id'],
  deferrable: 'DEFERRABLE',
})

bTicketsTableForeignKeys.push(fkTicketId, fkTicketStatusId, fkUserId1, fkUserId2)

export default bTicketsTableForeignKeys
