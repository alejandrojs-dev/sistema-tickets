import { Repository, getConnection } from 'typeorm'
import Ticket from '../entities/Ticket'

const getTicketRepository = (): Repository<Ticket> => {
  return getConnection().getRepository(Ticket)
}

export { getTicketRepository }
