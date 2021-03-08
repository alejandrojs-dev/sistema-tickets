import { IBaseController } from '../interfaces/BaseController.interface'
import { injectable, inject } from 'inversify'
import { UpdateResult, DeleteResult } from 'typeorm'
import TicketTypeService from '../services/TicketTypeService'
import TicketType from '../entities/TicketType'
import TYPES from '../utils/types'
import 'reflect-metadata'

@injectable()
class TicketTypeController implements IBaseController {
  private _ticketTypeService: TicketTypeService

  constructor(@inject(TYPES.UserService) ticketTypeService: TicketTypeService) {
    this._ticketTypeService = ticketTypeService
  }

  public async index(): Promise<TicketType[]> {
    return await this._ticketTypeService.all()
  }

  public async store(entity: TicketType): Promise<TicketType> {
    return await this._ticketTypeService.save(entity)
  }

  public async show(id: number): Promise<TicketType> {
    return await this._ticketTypeService.get(id)
  }

  public async update(id: number, entity: TicketType): Promise<UpdateResult> {
    return await this._ticketTypeService.change(id, entity)
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this._ticketTypeService.erase(id)
  }
}

export default TicketTypeController
