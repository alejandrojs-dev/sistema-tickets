import { injectable, inject } from 'inversify'
import { DeleteResult } from 'typeorm'
import { IBaseController } from '../interfaces/BaseController.interface'
import TicketGroupService from '../services/TicketGroupService'
import TicketGroup from '../entities/TicketGroup'
import TYPES from '../utils/types'
import 'reflect-metadata'

@injectable()
class TicketGroupController implements IBaseController {
  private _ticketGroupService: TicketGroupService

  constructor(@inject(TYPES.TicketGroupService) ticketGroupService: TicketGroupService) {
    this._ticketGroupService = ticketGroupService
  }

  public async index(): Promise<TicketGroup[]> {
    return await this._ticketGroupService.all()
  }

  public async indexWithRelationShips(): Promise<TicketGroup[]> {
    return await this._ticketGroupService.allWithRelationShips()
  }

  public async store(entity: TicketGroup, assignedUsers?: number[]): Promise<TicketGroup> {
    return await this._ticketGroupService.save(entity, assignedUsers)
  }

  public async show(id: number): Promise<TicketGroup> {
    return await this._ticketGroupService.get(id)
  }

  public async update(id: number, entity: TicketGroup, assignedUsers?: number[]): Promise<TicketGroup> {
    return await this._ticketGroupService.change(id, entity, assignedUsers)
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this._ticketGroupService.erase(id)
  }
}

export default TicketGroupController
