import { UpdateResult, DeleteResult } from 'typeorm'
import { injectable, inject } from 'inversify'
import Ticket from '../entities/Ticket'
import TYPES from '../utils/types'
import TicketService from '../services/TicketService'
import 'reflect-metadata'

@injectable()
class TicketController {
  private _ticketService: TicketService

  constructor(@inject(TYPES.TicketService) ticketService: TicketService) {
    this._ticketService = ticketService
  }

  public async index(userId: number): Promise<any> {
    return await this._ticketService.getTicketsTrayByUser(userId)
  }

  public async getTicketsToAuthorizeByUser(userId: number): Promise<any> {
    return await this._ticketService.getTicketsToAuthorizeByUser(userId)
  }

  public async getAuthorizeUsersByTicket(ticketId: number): Promise<any> {
    return await this._ticketService.getAuthorizeUsersByTicket(ticketId)
  }

  public async storeTSTicket(entity: Ticket): Promise<Ticket> {
    return await this._ticketService.saveTSTicket(entity)
  }

  public async storeTACTicket(entity: Ticket, usersWhoAuthorize: number[]): Promise<any> {
    return await this._ticketService.saveTACTicket(entity, usersWhoAuthorize)
  }

  public async show(id: number): Promise<any> {
    return await this._ticketService.get(id)
  }

  public async showAuthorizedTicket(id: number, userId: number): Promise<any> {
    return await this._ticketService.getAuthorizedTicket(id, userId)
  }

  public async update(id: number, entity: Ticket): Promise<UpdateResult> {
    return await this._ticketService.change(id, entity)
  }

  public async updateViewedStatus(id: number, isViewed: boolean): Promise<any> {
    return await this._ticketService.updateViewedStatus(id, isViewed)
  }

  public async updateSemaphoreColor(id: number, semaphoreColor: string, expired: boolean): Promise<UpdateResult> {
    return await this._ticketService.updateSemaphoreColor(id, semaphoreColor, expired)
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this._ticketService.erase(id)
  }

  public async take(
    id: number,
    status: number,
    userTakeTicketId: number,
    semaphoreColor: string,
    isViewed: boolean,
  ): Promise<any> {
    return await this._ticketService.take(id, status, userTakeTicketId, semaphoreColor, isViewed)
  }

  public async cancel(
    id: number,
    status: number,
    userCancelTicketId: number,
    cancelComment: string,
    expired: boolean,
  ): Promise<any> {
    return await this._ticketService.cancel(id, status, userCancelTicketId, cancelComment, expired)
  }

  public async reassign(
    id: number,
    userIdWhoAssign: number,
    userIdToAssign: number,
    status: number,
    isViewed: boolean,
  ): Promise<any> {
    return await this._ticketService.reassign(id, userIdWhoAssign, userIdToAssign, status, isViewed)
  }

  public async pause(id: number, status: number, userPauseTicketId: number, pauseComment: string): Promise<any> {
    return await this._ticketService.pause(id, status, userPauseTicketId, pauseComment)
  }

  public async resume(id: number, userResumeTicketId: number): Promise<any> {
    return await this._ticketService.resume(id, userResumeTicketId)
  }

  public async authorize(id: number, status: number, userAuthorizeId: number, subGroupId: number): Promise<any> {
    return await this._ticketService.authorize(id, status, userAuthorizeId, subGroupId)
  }

  public async decline(id: number, status: number, userDeclineId: number, declineComment: string): Promise<any> {
    return await this._ticketService.decline(id, status, userDeclineId, declineComment)
  }

  public async getSumDeadTimesTicket(id: number): Promise<number> {
    return await this._ticketService.getSumDeadTimesTicket(id)
  }
}

export default TicketController
