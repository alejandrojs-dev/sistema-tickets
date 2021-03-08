import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import TicketSubGroup from './TicketSubGroup'
import User from './User'

@Unique(['name'])
@Entity({
  name: 'c_ticket_groups',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class TicketGroup extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  id: number

  @Column({ type: 'varchar', length: 50, name: 'name', nullable: false })
  name: string

  @Column({ type: 'varchar', length: 50, name: 'description', nullable: false })
  description: string

  @Column({ type: 'varchar', length: 50, name: 'icon', nullable: false })
  icon: string

  @Column({ type: 'tinyint', name: 'active', default: true })
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

  @OneToMany(type => TicketSubGroup, ticketSubGroup => ticketSubGroup.ticketGroup)
  ticketSubGroups: TicketSubGroup[]

  @ManyToMany(type => User, user => user.ticketGroups, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinTable({
    name: 'd_user_ticket_group',
    joinColumn: {
      name: 'ticket_group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
  })
  users: User[]
}

export default TicketGroup
