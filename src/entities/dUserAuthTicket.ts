import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'd_user_auth_ticket',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class dUserAuthTicket extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  public id: number

  @Column({ type: 'int', unsigned: true, nullable: false, name: 'ticket_id' })
  public ticketId: number

  @Column({ type: 'int', unsigned: true, nullable: false, name: 'user_id' })
  public userId: number

  @Column({ type: 'tinyint', nullable: false, name: 'authorized', default: 0 })
  public authorized: boolean

  @Column({ type: 'tinyint', nullable: false, name: 'declined', default: 0 })
  public declined: boolean

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'date_ticket_authorize',
  })
  dateTicketAuthorized: Date
}

export default dUserAuthTicket
