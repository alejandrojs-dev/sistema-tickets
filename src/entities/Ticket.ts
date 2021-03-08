import {
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm'
import TicketType from './TicketType'
import TicketGroup from './TicketGroup'
import TicketSubGroup from './TicketSubGroup'
import Priority from './Priority'
import TicketStatus from './TicketStatus'
import BinnacleTicket from './BinnacleTicket'
import User from './User'

@Entity({
  name: 'e_tickets',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  id: number

  @Column({ type: 'int', nullable: false, unsigned: true })
  ticket_type_id: number

  @Column({ type: 'int', nullable: false, unsigned: true })
  ticket_group_id: number

  @Column({ type: 'int', nullable: false, unsigned: true })
  ticket_subgroup_id: number

  @Column({ type: 'int', nullable: false, unsigned: true, default: 1 })
  ticket_status_id: number

  @Column({ type: 'int', nullable: false, unsigned: true })
  priority_id: number

  @Column({ type: 'varchar', name: 'description', nullable: true, length: 100 })
  description: string

  @Column({ type: 'text', name: 'cancel_comment', nullable: true })
  cancelComment: string

  @Column({ type: 'int', name: 'user_ticket_create', nullable: true })
  userTicketCreate: number

  @Column({ type: 'int', name: 'user_ticket_taken', nullable: true })
  userTicketTaken: number

  @Column({ type: 'int', name: 'user_ticket_cancel', nullable: true })
  userTicketCancel: number

  @Column({ type: 'tinyint', name: 'is_viewed', nullable: false, unsigned: true, default: 0 })
  isViewed: boolean

  @Column({ type: 'tinyint', name: 'is_expired', nullable: false, unsigned: true, default: 0 })
  isExpired: boolean

  @Column({ type: 'varchar', name: 'semaphore_color', nullable: true, length: 50 })
  semaphoreColor: string

  @Column({ type: 'varchar', name: 'timer_text_content', nullable: true, length: 50 })
  timerTextContent: string

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'date_ticket_taken',
  })
  dateTicketTaken: Date

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'date_ticket_cancel',
  })
  dateTicketCancel: Date

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
  @OneToOne(type => TicketType, { eager: true })
  @JoinColumn({ name: 'ticket_type_id', referencedColumnName: 'id' })
  ticketType: TicketType

  @OneToOne(type => TicketGroup, { eager: true })
  @JoinColumn({ name: 'ticket_group_id', referencedColumnName: 'id' })
  ticketGroup: TicketGroup

  @OneToOne(type => TicketSubGroup, { eager: true })
  @JoinColumn({ name: 'ticket_subgroup_id', referencedColumnName: 'id' })
  ticketSubgroup: TicketSubGroup

  @OneToOne(type => TicketStatus, { eager: true })
  @JoinColumn({ name: 'ticket_status_id', referencedColumnName: 'id' })
  ticketStatus: TicketStatus

  @OneToOne(type => Priority, { eager: true })
  @JoinColumn({ name: 'priority_id', referencedColumnName: 'id' })
  priority: Priority

  @OneToMany(type => BinnacleTicket, binnacle => binnacle.ticket)
  binnacleTickets: BinnacleTicket[]

  @ManyToMany(type => User, user => user.userAuthTicketDetails, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinTable({
    name: 'd_user_auth_ticket',
    joinColumn: {
      name: 'ticket_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
  })
  usersAuthorize: User[]
}

export default Ticket
