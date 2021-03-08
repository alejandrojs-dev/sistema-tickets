import { TableForeignKey } from 'typeorm'

const eTicketsTableForeignKeys: TableForeignKey[] = []

const fkTicketTypeIdTickets = new TableForeignKey({
  name: 'fk_ticket_type_id_tickets',
  columnNames: ['ticket_type_id'],
  referencedTableName: 'c_ticket_types',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

const fkTicketGroupId = new TableForeignKey({
  name: 'fk_ticket_group_id',
  columnNames: ['ticket_group_id'],
  referencedTableName: 'c_ticket_groups',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

const fkTicketSubGroupId = new TableForeignKey({
  name: 'fk_ticket_subgroup_id',
  columnNames: ['ticket_subgroup_id'],
  referencedTableName: 'c_ticket_subgroups',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

const fkTicketStatusId = new TableForeignKey({
  name: 'fk_ticket_status_id',
  columnNames: ['ticket_status_id'],
  referencedTableName: 'c_ticket_status',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

const fkPriorityId = new TableForeignKey({
  name: 'fk_priority_id',
  columnNames: ['priority_id'],
  referencedTableName: 'c_priorities',
  referencedColumnNames: ['id'],
  deferrable: 'DEFERRABLE',
})

eTicketsTableForeignKeys.push(
  fkTicketTypeIdTickets,
  fkTicketGroupId,
  fkTicketSubGroupId,
  fkTicketStatusId,
  fkPriorityId,
)

export default eTicketsTableForeignKeys
