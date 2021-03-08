import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import TicketSubGroup from './TicketSubGroup'

@Unique(['type'])
@Entity({
  name: 'c_ticket_types',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class TicketType extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  id: number

  @Column({ type: 'varchar', length: 50, name: 'type', nullable: false })
  type: string

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

  @OneToMany(type => TicketSubGroup, ticketSubGroup => ticketSubGroup.ticketType)
  ticketSubGroups: TicketSubGroup[]
  //static methods
}

export default TicketType
