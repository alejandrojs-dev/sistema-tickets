import { TableForeignKey } from 'typeorm'

const cTicketSubGroupsTableForeignKeys: TableForeignKey[] = []

const fkGroupTicketId = new TableForeignKey({
  name: 'fk_group_ticket_id',
  columnNames: ['group_ticket_id'],
  referencedTableName: 'c_ticket_groups',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
  onDelete: 'CASCADE',
})

const fkTicketTypeIdSubGroup = new TableForeignKey({
  name: 'fk_ticket_type_id_subgroup',
  columnNames: ['ticket_type_id'],
  referencedTableName: 'c_ticket_types',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
  onDelete: 'CASCADE',
})

cTicketSubGroupsTableForeignKeys.push(fkGroupTicketId, fkTicketTypeIdSubGroup)

export default cTicketSubGroupsTableForeignKeys
