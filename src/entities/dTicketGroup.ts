import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity({
  name: 'd_user_ticket_group',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class dTicketGroup extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  public id: number

  @Column({ type: 'int', unsigned: true, nullable: false })
  public ticket_group_id: number

  @Column({ type: 'int', unsigned: true, nullable: false })
  public user_id: number
}

export default dTicketGroup
