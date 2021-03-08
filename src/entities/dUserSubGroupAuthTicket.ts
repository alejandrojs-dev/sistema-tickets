import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity({
  name: 'd_user_ticket_subgroup',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class dUserSubGroupAuthTicket extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  public id: number

  @Column({ type: 'int', unsigned: true, nullable: false, name: 'ticket_subgroup_id' })
  public ticketSubGroupId: number

  @Column({ type: 'int', unsigned: true, nullable: false, name: 'user_id' })
  public userId: number
}

export default dUserSubGroupAuthTicket
