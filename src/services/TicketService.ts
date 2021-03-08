import { DeleteResult, getConnection, InsertResult, UpdateResult } from 'typeorm'
import { injectable } from 'inversify'
import { createBinnacleTicketsQueryBuilder, createTicketQueryBuilder } from '../database/queryBuilders'
import Ticket from '../entities/Ticket'
import BinnacleTicket from '../entities/BinnacleTicket'
import dUserAuthTicket from '../entities/dUserAuthTicket'
import 'reflect-metadata'

@injectable()
class TicketService {
  public async getTicketsTrayByUser(userId: number): Promise<any> {
    const result: any = await getConnection().manager.query('CALL spr_get_tickets(?)', [userId])
    let tickets: any[] = result[0]
    tickets = tickets.map(t => {
      t.taken = Boolean(t.taken)
      t.canceled = Boolean(t.canceled)
      t.reassigned = Boolean(t.reassigned)
      t.paused = Boolean(t.paused)
      t.declined = Boolean(t.declined)
      t.inAuthorization = Boolean(t.inAuthorization)
      return t
    })
    return tickets
  }

  public async getTicketsToAuthorizeByUser(userId: number): Promise<any> {
    const parameters: any[] = []

    parameters.push(userId)

    const result: any = await getConnection().manager.query('CALL spr_get_authorize_tickets_by_user(?)', parameters)

    let ticketsToAuthorize: any[] = result[0]

    ticketsToAuthorize = ticketsToAuthorize.map(t => {
      t.authorized = Boolean(parseInt(t.authorized))
      t.declined = Boolean(parseInt(t.declined))
      t.reassigned = Boolean(parseInt(t.reassigned))
      t.canceled = Boolean(parseInt(t.canceled))
      t.inAuthorization = Boolean(parseInt(t.inAuthorization))
      t.isCompletelyAuthorized = Boolean(parseInt(t.isCompletelyAuthorized))
      return t
    })

    return ticketsToAuthorize
  }

  public async saveTSTicket(ticket: Ticket): Promise<Ticket> {
    const savedTicket: Ticket = await Ticket.save(ticket)
    if (savedTicket) {
      await createBinnacleTicketsQueryBuilder()
        .insert()
        .into(BinnacleTicket)
        .values({
          ticketId: savedTicket.id,
          ticketStatusId: savedTicket.ticket_status_id,
          userId1: savedTicket.userTicketCreate,
        })
        .execute()

      const ticket: any = await this.get(savedTicket.id)

      return ticket
    }
  }

  public async saveTACTicket(entity: Ticket, usersWhoAuthorize: number[]): Promise<any> {
    const savedTicket: Ticket = await Ticket.save(entity)
    if (usersWhoAuthorize.length > 0) {
      for (let i = 0; i < usersWhoAuthorize.length; i++) {
        const userId: number = usersWhoAuthorize[i]
        const userAuthTicket: dUserAuthTicket = await dUserAuthTicket.create()
        userAuthTicket.ticketId = savedTicket.id
        userAuthTicket.userId = userId
        dUserAuthTicket.save(userAuthTicket)
      }
    }
    if (savedTicket) {
      await createBinnacleTicketsQueryBuilder()
        .insert()
        .into(BinnacleTicket)
        .values({
          ticketId: savedTicket.id,
          ticketStatusId: savedTicket.ticket_status_id,
          userId1: savedTicket.userTicketCreate,
        })
        .execute()

      const ticket: any = await this.get(savedTicket.id)

      return ticket
    }
  }

  public async get(id: number): Promise<any> {
    const result: any = await getConnection().manager.query('CALL spr_get_ticket_by_id(?)', [id])
    const ticket: any = result[0][0]
    ticket.taken = Boolean(Number(ticket.taken))
    ticket.canceled = Boolean(Number(ticket.canceled))
    ticket.isNew = Boolean(Number(ticket.isNew))
    ticket.reassigned = Boolean(Number(ticket.reassigned))
    ticket.paused = Boolean(Number(ticket.paused))
    ticket.expired = Boolean(Number(ticket.expired))
    ticket.declined = Boolean(Number(ticket.declined))
    return ticket
  }

  public async getAuthorizedTicket(id: number, userId: number): Promise<any> {
    const result: any = await getConnection().manager.query('CALL spr_get_authorized_ticket_by_id(?,?)', [id, userId])
    const ticket: any = result[0][0]

    ticket.authorized = Boolean(parseInt(ticket.authorized))
    ticket.declined = Boolean(parseInt(ticket.declined))
    ticket.inAuthorization = Boolean(parseInt(ticket.inAuthorization))
    ticket.isCompletelyAuthorized = Boolean(parseInt(ticket.isCompletelyAuthorized))

    return ticket
  }

  public async getAuthorizeUsersByTicket(id: number): Promise<any> {
    let result: any = await getConnection().manager.query('CALL spr_get_authorize_users_by_ticket(?)', [id])

    let users: any[] = result[0]

    users = users.map(u => {
      u.hasAuthorized = Boolean(u.hasAuthorized)
      u.hasDeclined = Boolean(u.hasDeclined)
      return u
    })
    return users
  }

  public async change(id: number, entity: Ticket): Promise<UpdateResult> {
    return await Ticket.update(id, entity)
  }

  public async updateViewedStatus(id: number, isViewed: boolean): Promise<any> {
    const result: UpdateResult = await Ticket.update(id, { isViewed })

    if (result.affected > 0) {
      return await this.get(id)
    }
  }

  public async updateSemaphoreColor(id: number, semaphoreColor: string, expired: boolean): Promise<UpdateResult> {
    if (expired && expired != null) {
      return await Ticket.update(id, { semaphoreColor, isExpired: expired })
    } else {
      return await Ticket.update(id, { semaphoreColor })
    }
  }

  public async erase(id: number): Promise<DeleteResult> {
    return await Ticket.delete(id)
  }

  public async getNotifications(userId: number): Promise<any[]> {
    const result: any = await getConnection().manager.query('CALL spr_get_notifications_by_user_id(?)', [userId])
    const notifications: any = result[0]
    return notifications
  }

  public async take(
    id: number,
    status: number,
    userTakeTicketId: number,
    semaphoreColor: string,
    isViewed: boolean,
  ): Promise<any> {
    const parameters: any[] = []
    const response: any = {}

    parameters.push(id)
    parameters.push(status)
    parameters.push(userTakeTicketId)
    parameters.push(semaphoreColor)
    parameters.push(isViewed)

    const result: any = await getConnection().manager.query('CALL spr_take_ticket(?,?,?,?,?)', parameters)
    const ticket: any = await this.get(id)

    response.taken = Boolean(parseInt(result[0][0].taken))
    response.ticket = ticket

    return response
  }

  public async cancel(
    id: number,
    status: number,
    userCancelTicketId: number,
    cancelComment: string,
    expired: boolean,
  ): Promise<any> {
    const parameters: any[] = []
    const response: any = {}

    parameters.push(id)
    parameters.push(status)
    parameters.push(userCancelTicketId)
    parameters.push(cancelComment)
    parameters.push(expired)

    const result: any = await getConnection().manager.query('CALL spr_cancel_ticket(?,?,?,?,?)', parameters)
    const ticket: any = await this.get(id)

    response.canceled = Boolean(parseInt(result[0][0].canceled))
    response.ticket = ticket

    return response
  }

  public async reassign(
    id: number,
    userIdWhoAssign: number,
    userIdToAssign: number,
    status: number,
    isViewed: boolean,
  ): Promise<any> {
    const parameters: any[] = []
    const response: any = {}

    parameters.push(id)
    parameters.push(status)
    parameters.push(userIdWhoAssign)
    parameters.push(userIdToAssign)
    parameters.push(isViewed)

    const result: any = await getConnection().manager.query('CALL spr_reassign_ticket(?,?,?,?,?)', parameters)
    const ticket: any = await this.get(id)

    response.reassigned = Boolean(parseInt(result[0][0].reassigned))
    response.ticket = ticket

    return response
  }

  public async pause(id: number, status: number, userPauseTicketId: number, pauseComment: string): Promise<any> {
    const parameters: any[] = []
    const response: any = {}

    parameters.push(id)
    parameters.push(status)
    parameters.push(userPauseTicketId)
    parameters.push(pauseComment)

    const result: any = await getConnection().manager.query('CALL spr_pause_ticket(?,?,?,?)', parameters)
    const ticket: any = await this.get(id)

    response.paused = Boolean(parseInt(result[0][0].paused))
    response.ticket = ticket

    return response
  }

  public async resume(id: number, userResumeTicketId: number): Promise<any> {
    const parameters: any[] = []
    const response: any = {}

    parameters.push(id)
    parameters.push(userResumeTicketId)

    const result: any = await getConnection().manager.query('CALL spr_resume_ticket(?,?)', parameters)
    const ticket: any = await this.get(id)

    response.resumed = Boolean(parseInt(result[0][0].resumed))
    response.ticket = ticket

    return response
  }

  public async authorize(id: number, status: number, userAuthorizeId: number, subGroupId: number): Promise<any> {
    const parameters: any[] = []
    const response: any = {}

    parameters.push(id)
    parameters.push(status)
    parameters.push(userAuthorizeId)
    parameters.push(subGroupId)

    const result: any = await getConnection().manager.query('CALL spr_authorize_ticket(?,?,?,?)', parameters)
    const ticket: any = await this.getAuthorizedTicket(id, userAuthorizeId)

    response.isCompletelyAuthorized = Boolean(parseInt(result[0][0].isCompletelyAuthorized))
    response.ticket = ticket

    return response
  }

  public async decline(id: number, status: number, userDeclineId: number, declineComment: string): Promise<any> {
    const parameters: any[] = []
    const response: any = {}

    parameters.push(id)
    parameters.push(status)
    parameters.push(userDeclineId)
    parameters.push(declineComment)

    const result: any = await getConnection().manager.query('CALL spr_decline_ticket(?,?,?,?)', parameters)
    const ticket: any = await this.getAuthorizedTicket(id, userDeclineId)

    if (result.length > 0) {
      response.declined = Boolean(parseInt(result[0][0].declined))
      response.ticket = ticket

      return response
    }
  }

  public async getSumDeadTimesTicket(id: number): Promise<number> {
    const result: any = await getConnection().manager.query('CALL spr_get_dead_times_ticket(?)', [id])
    return Number(result[0][0].sumDeadTimesInSeconds)
  }
}

export default TicketService
