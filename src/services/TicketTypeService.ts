import { UpdateResult, DeleteResult } from 'typeorm'
import { injectable } from 'inversify'
import { IService } from '../interfaces/Service.interface'
import { createTicketTypeQueryBuilder } from '../database/queryBuilders'
import TicketType from '../entities/TicketType'
import 'reflect-metadata'

@injectable()
class TicketTypeService implements IService {
  public async all(): Promise<TicketType[]> {
    return await TicketType.find()
  }

  public async save(entity: TicketType): Promise<TicketType> {
    return await TicketType.save(entity)
  }

  public async get(id: number): Promise<TicketType> {
    return await TicketType.findOne(id)
  }

  public async change(id: number, entity: TicketType): Promise<UpdateResult> {
    return await TicketType.update(id, entity)
  }

  public async erase(id: number): Promise<DeleteResult> {
    return await TicketType.delete(id)
  }

  public async validateEntityExists(criteria: string | number): Promise<boolean> {
    let exists: boolean = false
    const entityFounded: TicketType = await createTicketTypeQueryBuilder()
      .where('tg.id = :id', { id: criteria })
      .orWhere('tg.type = :type', { type: criteria })
      .getOne()
    //entityFounded = await TicketType.findOne({where: { type: criteria }})
    if (entityFounded) exists = true
    return exists
  }
}

export default TicketTypeService
