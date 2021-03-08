import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import TicketGroup from './TicketGroup'
import TicketType from './TicketType'
import User from './User'

@Entity({
  name: 'c_ticket_subgroups',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class TicketSubGroup extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  id: number

  @Column({ type: 'int', unsigned: true, nullable: false })
  group_ticket_id: number

  @Column({ type: 'int', unsigned: true, nullable: false })
  ticket_type_id: number

  @Column({ type: 'varchar', length: 50, name: 'name', nullable: false })
  name: string

  @Column({
    type: 'int',
    unsigned: true,
    default: 259200,
    nullable: false,
    name: 'service_level',
  })
  service_level: number

  @Column({ type: 'int', unsigned: true, name: 'number_auth', nullable: true })
  number_auth: number

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'icon', default: "'mdi-cog'" })
  icon: string

  @Column({ type: 'tinyint', name: 'active' })
  active: boolean

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
    name: 'created_at',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP()',
    name: 'updated_at',
  })
  updateAt: Date

  //Relationships
  @ManyToOne(type => TicketGroup, ticketGroup => ticketGroup.ticketSubGroups, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'group_ticket_id', referencedColumnName: 'id' })
  ticketGroup: TicketGroup

  @ManyToOne(type => TicketType, ticketType => ticketType.ticketSubGroups, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'ticket_type_id', referencedColumnName: 'id' })
  ticketType: TicketType

  @ManyToMany(type => User, user => user.ticketSubGroupAuthDetails, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'd_user_subgroup_auth_ticket',
    joinColumn: {
      name: 'ticket_subgroup_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
  })
  usersWhoAuthorize: User[]
}

export default TicketSubGroup
