import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm'

@Entity({
  name: 'c_priorities',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class Priority extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true, name: 'id' })
  id: number

  @Column({ type: 'varchar', name: 'description', nullable: true, length: 255 })
  description: string

  @Column({ type: 'varchar', name: 'color', nullable: true, length: 255 })
  color: string

  @Column({ type: 'tinyint', name: 'active', default: true })
  active: boolean
}

export default Priority
