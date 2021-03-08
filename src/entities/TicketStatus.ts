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
import BinnacleTicket from './BinnacleTicket'

@Unique(['status'])
@Entity({
  name: 'c_ticket_status',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class TicketStatus extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  id: number

  @Column({ type: 'varchar', length: 50, name: 'status', nullable: false })
  status: string

  @Column({ type: 'varchar', length: 50, name: 'color', nullable: false })
  color: string

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

  //realtionships
  @OneToMany(type => BinnacleTicket, binnacle => binnacle.ticketStatus)
  binnacleTickets: BinnacleTicket[]

  //static methods
}

export default TicketStatus
