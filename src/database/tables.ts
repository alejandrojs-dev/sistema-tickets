import { Table } from 'typeorm'

const tables: Table[] = []

const cTicketTypes: Table = new Table({
  name: 'c_ticket_types',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'type',
      type: 'varchar',
      isNullable: false,
      length: '50',
    },
    {
      name: 'active',
      type: 'tinyint',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      isNullable: true,
      default: 'CURRENT_TIMESTAMP()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: true,
      onUpdate: 'CURRENT_TIMESTAMP()',
    },
  ],
  engine: 'InnoDB',
})

const cTicketGroup: Table = new Table({
  name: 'c_ticket_groups',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'name',
      type: 'varchar',
      isNullable: false,
      length: '50',
      isUnique: true,
    },
    {
      name: 'description',
      type: 'varchar',
      isNullable: false,
      length: '50',
    },
    {
      name: 'icon',
      type: 'varchar',
      isNullable: false,
      length: '50',
    },
    {
      name: 'active',
      type: 'tinyint',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      isNullable: true,
      default: 'CURRENT_TIMESTAMP()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: true,
      onUpdate: 'CURRENT_TIMESTAMP()',
    },
  ],
  engine: 'InnoDB',
})

const cTicketSubGroup: Table = new Table({
  name: 'c_ticket_subgroups',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'group_ticket_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'ticket_type_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'name',
      type: 'varchar',
      length: '50',
      isNullable: false,
    },
    {
      name: 'service_level',
      type: 'int',
      isNullable: false,
      default: 259200,
    },
    {
      name: 'number_auth',
      type: 'int',
      isNullable: true,
    },
    {
      name: 'icon',
      type: 'varchar',
      isNullable: true,
      length: '50',
      default: "'mdi-cog'",
    },
    {
      name: 'active',
      type: 'tinyint',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      isNullable: true,
      default: 'CURRENT_TIMESTAMP()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: true,
      onUpdate: 'CURRENT_TIMESTAMP()',
    },
  ],
  engine: 'InnoDB',
})

const cTicketStatus: Table = new Table({
  name: 'c_ticket_status',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'status',
      type: 'varchar',
      isNullable: false,
      length: '50',
    },
    {
      name: 'color',
      type: 'varchar',
      isNullable: false,
      length: '50',
    },
    {
      name: 'active',
      type: 'tinyint',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      isNullable: true,
      default: 'CURRENT_TIMESTAMP()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: true,
      onUpdate: 'CURRENT_TIMESTAMP()',
    },
  ],
  engine: 'InnoDB',
})

const cPriorities = new Table({
  name: 'c_priorities',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'description',
      isNullable: false,
      length: '50',
      type: 'varchar',
    },
    {
      name: 'color',
      type: 'varchar',
      isNullable: false,
      length: '50',
    },
    {
      name: 'active',
      type: 'tinyint',
      isNullable: false,
    },
  ],
  engine: 'InnoDB',
})

const eTickets = new Table({
  name: 'e_tickets',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'ticket_type_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'ticket_group_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'ticket_subgroup_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'ticket_status_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
      default: 1,
    },
    {
      name: 'priority_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'description',
      type: 'varchar',
      isNullable: true,
      length: '255',
    },
    {
      name: 'cancel_comment',
      type: 'text',
      isNullable: true,
    },
    {
      name: 'user_ticket_create',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'user_ticket_taken',
      type: 'int',
      isNullable: true,
      unsigned: true,
    },
    {
      name: 'user_ticket_cancel',
      type: 'int',
      isNullable: true,
      unsigned: true,
    },
    {
      name: 'is_viewed',
      type: 'tinyint',
      isNullable: false,
      unsigned: false,
      default: 0,
    },
    {
      name: 'is_expired',
      type: 'tinyint',
      isNullable: false,
      unsigned: false,
      default: 0,
    },
    {
      name: 'semaphore_color',
      type: 'varchar',
      isNullable: true,
      length: '50',
    },
    {
      name: 'timer_text_content',
      type: 'varchar',
      isNullable: true,
      length: '50',
    },
    {
      name: 'date_ticket_taken',
      type: 'timestamp',
      isNullable: true,
    },
    {
      name: 'date_ticket_cancel',
      type: 'timestamp',
      isNullable: true,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      isNullable: true,
      default: 'CURRENT_TIMESTAMP()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: true,
      onUpdate: 'CURRENT_TIMESTAMP()',
    },
  ],
  engine: 'InnoDB',
})

const cUsersApi = new Table({
  name: 'c_users_api',
  columns: [
    {
      name: 'user_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
      isPrimary: true,
    },
    {
      name: 'username',
      type: 'varchar',
      isNullable: false,
      length: '50',
      isUnique: true,
    },
    {
      name: 'profile_img',
      type: 'varchar',
      isNullable: true,
      length: '50',
    },
    {
      name: 'room_name',
      type: 'varchar',
      isNullable: true,
      length: '50',
    },
  ],
  engine: 'InnoDB',
})

const dUserSubGroupAuthTicket = new Table({
  name: 'd_user_subgroup_auth_ticket',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'ticket_subgroup_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'user_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
  ],
  engine: 'InnoDB',
})

const dUserTicketGroup = new Table({
  name: 'd_user_ticket_group',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'ticket_group_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'user_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
  ],
  engine: 'InnoDB',
})

const bTickets = new Table({
  name: 'b_tickets',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'ticket_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'ticket_status_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'user_id_1',
      type: 'int',
      isNullable: true,
      unsigned: true,
    },
    {
      name: 'user_id_2',
      type: 'int',
      isNullable: true,
      unsigned: true,
    },
    {
      name: 'comments',
      type: 'text',
      isNullable: true,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      isNullable: true,
      default: 'CURRENT_TIMESTAMP()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: true,
      onUpdate: 'CURRENT_TIMESTAMP()',
    },
  ],
})

const dUserAuthTicket = new Table({
  name: 'd_user_auth_ticket',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      unsigned: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'ticket_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'user_id',
      type: 'int',
      isNullable: false,
      unsigned: true,
    },
    {
      name: 'authorized',
      type: 'tinyint',
      default: 0,
      unsigned: true,
      isNullable: false,
    },
    {
      name: 'declined',
      type: 'tinyint',
      default: 0,
      unsigned: true,
      isNullable: false,
    },
    {
      name: 'date_ticket_authorize',
      type: 'timestamp',
      isNullable: true,
    },
  ],
})

tables.push(
  cTicketTypes,
  cTicketGroup,
  cTicketSubGroup,
  cTicketStatus,
  cPriorities,
  eTickets,
  cUsersApi,
  dUserSubGroupAuthTicket,
  dUserTicketGroup,
  bTickets,
  dUserAuthTicket,
)

export default tables
