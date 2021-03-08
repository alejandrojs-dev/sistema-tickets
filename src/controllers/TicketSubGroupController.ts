import { injectable, inject } from 'inversify'
import { DeleteResult } from 'typeorm'
import TicketSubGroupService from '../services/TicketSubGroupService'
import TicketSubGroup from '../entities/TicketSubGroup'
import TYPES from '../utils/types'
import 'reflect-metadata'

@injectable()
class TicketSubGroupController {
  private _ticketSubGroupService: TicketSubGroupService

  constructor(@inject(TYPES.TicketSubGroupService) ticketSubGroupService: TicketSubGroupService) {
    this._ticketSubGroupService = ticketSubGroupService
  }

  public async index(): Promise<TicketSubGroup[]> {
    return await this._ticketSubGroupService.all()
  }

  public async store(entity: TicketSubGroup, usersWhoAuthorize: number[]): Promise<TicketSubGroup> {
    return await this._ticketSubGroupService.save(entity, usersWhoAuthorize)
  }

  public async show(id: number, ticketTypeId: number): Promise<TicketSubGroup> {
    return await this._ticketSubGroupService.get(id, ticketTypeId)
  }

  public async update(
    id: number,
    ticketSubGroup: TicketSubGroup,
    usersWhoAuthorize: number[],
  ): Promise<TicketSubGroup> {
    return await this._ticketSubGroupService.change(id, ticketSubGroup, usersWhoAuthorize)
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this._ticketSubGroupService.erase(id)
  }
}

export default TicketSubGroupController
