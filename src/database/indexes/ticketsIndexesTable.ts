import { TableIndex } from 'typeorm'

const ticketIndexesTable: TableIndex[] = []

const indexTickets = new TableIndex({
  name: 'idxTickets',
  columnNames: ['ticket_type_id', 'ticket_group_id', 'ticket_subgroup_id', 'ticket_status_id'],
})

ticketIndexesTable.push(indexTickets)

export default ticketIndexesTable
