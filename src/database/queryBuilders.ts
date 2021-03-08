import { getConnection, SelectQueryBuilder } from 'typeorm'
import Ticket from '../entities/Ticket'
import TicketSubGroup from '../entities/TicketSubGroup'
import TicketGroup from '../entities/TicketGroup'
import TicketType from '../entities/TicketType'
import TicketStatus from '../entities/TicketStatus'
import User from '../entities/User'
import BinnacleTicket from '../entities/BinnacleTicket'
import dUserAuthTicket from '../entities/dUserAuthTicket'

const createTicketQueryBuilder = (): SelectQueryBuilder<Ticket> => {
  return getConnection().getRepository(Ticket).createQueryBuilder('t')
}

const createTicketSubGroupQueryBuilder = (): SelectQueryBuilder<TicketSubGroup> => {
  return getConnection().getRepository(TicketSubGroup).createQueryBuilder('ts')
}

const createTicketGroupsQueryBuilder = (): SelectQueryBuilder<TicketGroup> => {
  return getConnection().getRepository(TicketGroup).createQueryBuilder('tg')
}

const createTicketTypeQueryBuilder = (): SelectQueryBuilder<TicketType> => {
  return getConnection().getRepository(TicketType).createQueryBuilder('tt')
}

const createTicketStatusQueryBuilder = (): SelectQueryBuilder<TicketStatus> => {
  return getConnection().getRepository(TicketStatus).createQueryBuilder('tst')
}

const createUserQueryBuilder = (): SelectQueryBuilder<User> => {
  return getConnection().getRepository(User).createQueryBuilder('u')
}

const createBinnacleTicketsQueryBuilder = (): SelectQueryBuilder<BinnacleTicket> => {
  return getConnection().getRepository(BinnacleTicket).createQueryBuilder('bt')
}

const createUserAuthTicketsQueryBuilder = (): SelectQueryBuilder<dUserAuthTicket> => {
  return getConnection().getRepository(dUserAuthTicket).createQueryBuilder('uat')
}

export {
  createTicketQueryBuilder,
  createTicketSubGroupQueryBuilder,
  createTicketGroupsQueryBuilder,
  createTicketTypeQueryBuilder,
  createTicketStatusQueryBuilder,
  createUserQueryBuilder,
  createBinnacleTicketsQueryBuilder,
  createUserAuthTicketsQueryBuilder,
}
