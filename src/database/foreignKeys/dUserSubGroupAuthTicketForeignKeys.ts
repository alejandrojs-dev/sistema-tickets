import { TableForeignKey } from 'typeorm'

const dUserSubGroupAuthTicketTableForeignKeys: TableForeignKey[] = []

const fkTicketSubGroupId = new TableForeignKey({
  name: 'fk_d_ticket_subgroup_id',
  columnNames: ['ticket_subgroup_id'],
  referencedTableName: 'c_ticket_subgroups',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
  onDelete: 'CASCADE',
})

const fkUserId = new TableForeignKey({
  name: 'fk_d_user_id_subgroup',
  columnNames: ['user_id'],
  referencedTableName: 'c_users_api',
  referencedColumnNames: ['user_id'],
  deferrable: 'DEFERRABLE',
  onDelete: 'CASCADE',
})

dUserSubGroupAuthTicketTableForeignKeys.push(fkTicketSubGroupId, fkUserId)

export default dUserSubGroupAuthTicketTableForeignKeys
