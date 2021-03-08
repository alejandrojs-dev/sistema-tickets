import { IBaseController } from '../interfaces/BaseController.interface'
import { injectable, inject } from 'inversify'
import { UpdateResult, DeleteResult } from 'typeorm'
import TicketStatusService from '../services/TicketStatusService'
import TicketStatus from '../entities/TicketStatus'
import TYPES from '../utils/types'
import 'reflect-metadata'

@injectable()
class TicketStatusController implements IBaseController {
  private _ticketStatusService: TicketStatusService

  constructor(@inject(TYPES.TicketStatusService) ticketStatusService: TicketStatusService) {
    this._ticketStatusService = ticketStatusService
  }

  public async index(): Promise<TicketStatus[]> {
    return await this._ticketStatusService.all()
  }

  public async store(entity: TicketStatus): Promise<TicketStatus> {
    return await this._ticketStatusService.save(entity)
  }

  public async show(id: number): Promise<TicketStatus> {
    return await this._ticketStatusService.get(id)
  }

  public async update(id: number, entity: TicketStatus): Promise<UpdateResult> {
    return await this._ticketStatusService.change(id, entity)
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this._ticketStatusService.erase(id)
  }
}

export default TicketStatusController
