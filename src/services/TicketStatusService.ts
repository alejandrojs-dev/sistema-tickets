import { injectable } from 'inversify'
import { IService } from '../interfaces/Service.interface'
import { UpdateResult, DeleteResult } from 'typeorm'
import { createTicketStatusQueryBuilder } from '../database/queryBuilders'
import TicketStatus from '../entities/TicketStatus'
import 'reflect-metadata'

@injectable()
class TicketStatusService implements IService {
  public async all(): Promise<TicketStatus[]> {
    return await TicketStatus.find()
  }

  public async save(entity: TicketStatus): Promise<TicketStatus> {
    return await TicketStatus.save(entity)
  }

  public async get(id: number): Promise<TicketStatus> {
    return await TicketStatus.findOne(id)
  }

  public async change(id: number, entity: TicketStatus): Promise<UpdateResult> {
    return await TicketStatus.update(id, entity)
  }

  public async erase(id: number): Promise<DeleteResult> {
    return await TicketStatus.delete(id)
  }

  public async validateEntityExists(criteria: string | number): Promise<boolean> {
    let exists: boolean = false
    const entityFounded: TicketStatus = await createTicketStatusQueryBuilder()
      .where('tg.id = :id', { id: criteria })
      .orWhere('tg.status = :status', { status: criteria })
      .getOne()
    if (entityFounded) exists = true
    return exists
  }
}
export default TicketStatusService
