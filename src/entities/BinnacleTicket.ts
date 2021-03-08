import {
  PrimaryGeneratedColumn,
  JoinColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

import Ticket from './Ticket'
import TicketStatus from './TicketStatus'
import User from './User'

@Entity({
  name: 'b_tickets',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class BinnacleTicket extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  id: number

  @Column({ type: 'int', nullable: false, unsigned: true, name: 'ticket_id' })
  ticketId: number

  @Column({ type: 'int', nullable: false, unsigned: true, name: 'ticket_status_id' })
  ticketStatusId: number

  @Column({ type: 'int', nullable: false, unsigned: true, name: 'user_id_1' })
  userId1: number

  @Column({ type: 'int', nullable: false, unsigned: true, name: 'user_id_2' })
  userId2: number

  @Column({ type: 'text', nullable: false, name: 'comments' })
  comments: string

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

  //relatioships
  @ManyToOne(type => Ticket, ticket => ticket.binnacleTickets, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'ticket_id', referencedColumnName: 'id' })
  ticket: Ticket

  @ManyToOne(type => TicketStatus, ticketStatus => ticketStatus.binnacleTickets, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'ticket_status_id', referencedColumnName: 'id' })
  ticketStatus: TicketStatus

  @ManyToOne(type => User, user => user.binnacleTicketsUser1, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id_1', referencedColumnName: 'user_id' })
  user1: User

  @ManyToOne(type => User, user => user.binnacleTicketsUser2, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id_2', referencedColumnName: 'user_id' })
  user2: User
}

export default BinnacleTicket
