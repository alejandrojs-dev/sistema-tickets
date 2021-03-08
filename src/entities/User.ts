import { Column, Entity, BaseEntity, PrimaryColumn, ManyToMany, OneToMany } from 'typeorm'
import BinnacleTicket from './BinnacleTicket'
import Ticket from './Ticket'
import TicketGroup from './TicketGroup'
import TicketSubGroup from './TicketSubGroup'

@Entity({
  name: 'c_users_api',
  engine: 'InnoDB',
  database: 'tickets',
  synchronize: true,
})
class User extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, name: 'user_id', nullable: false, primary: true })
  user_id: number

  @Column({ type: 'varchar', name: 'username', nullable: false, length: 50, unique: true })
  username: string

  @Column({ type: 'varchar', name: 'profile_img', nullable: false, length: 50 })
  profile_img: string

  @Column({ type: 'varchar', name: 'room_name', nullable: false, length: 100 })
  roomName: string

  @ManyToMany(type => TicketSubGroup, ticketSubGroup => ticketSubGroup.usersWhoAuthorize)
  ticketSubGroupAuthDetails: TicketSubGroup[]

  @ManyToMany(type => TicketGroup, ticketGroup => ticketGroup.users)
  ticketGroups: TicketGroup[]

  @OneToMany(type => BinnacleTicket, binnacle => binnacle.user1)
  binnacleTicketsUser1: BinnacleTicket[]

  @OneToMany(type => BinnacleTicket, binnacle => binnacle.user2)
  binnacleTicketsUser2: BinnacleTicket[]

  @ManyToMany(type => Ticket, ticket => ticket.usersAuthorize)
  userAuthTicketDetails: Ticket[]
}

export default User
