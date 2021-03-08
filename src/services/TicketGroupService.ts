import { injectable } from 'inversify'
import { createTicketGroupsQueryBuilder } from '../database/queryBuilders'
import { DeleteResult } from 'typeorm'
import { IService } from '../interfaces/Service.interface'
import TicketGroup from '../entities/TicketGroup'
import TicketSubGroup from '../entities/TicketSubGroup'
import TicketType from '../entities/TicketType'
import User from '../entities/User'
import 'reflect-metadata'

@injectable()
class TicketGroupService implements IService {
  public async all(): Promise<TicketGroup[]> {
    return await createTicketGroupsQueryBuilder()
      .select(['tg.id', 'tg.name', 'tg.description', 'tg.icon', 'tg.active'])
      .leftJoinAndSelect('tg.users', 'u')
      .orderBy('tg.name', 'ASC')
      .getMany()
  }

  public async allWithRelationShips(): Promise<TicketGroup[]> {
    const ticketGroups: TicketGroup[] = await createTicketGroupsQueryBuilder()
      .leftJoinAndMapMany('tg.ticketSubGroups', TicketSubGroup, 'ts', 'ts.group_ticket_id = tg.id')
      .leftJoinAndMapOne('ts.ticketType', TicketType, 'tt', 'tt.id = ts.ticket_type_id')
      .leftJoinAndSelect('tg.users', 'u')
      .leftJoinAndSelect('ts.usersWhoAuthorize', 'ua')
      .select([
        'tg.id',
        'tg.name',
        'tg.description',
        'tg.icon',
        'ts.id',
        'ts.name',
        'ts.service_level',
        'ts.number_auth',
        'ts.icon',
        'tt.id',
        'tt.type',
        'u.user_id',
        'u.username',
        'ua.user_id',
      ])
      .where('tg.active = :active', { active: 1 })
      .orderBy('tg.name', 'DESC')
      .getMany()

    // for (const tg of ticketGroups) {
    //     tg.img = await getFileImageData(tg.img)
    // }
    return ticketGroups
  }

  public async save(data: TicketGroup, assignedUsers?: number[]): Promise<TicketGroup> {
    const users: User[] = await User.findByIds(assignedUsers)
    const ticketGroup = new TicketGroup()
    ticketGroup.name = data.name
    ticketGroup.description = data.name
    ticketGroup.icon = data.icon
    ticketGroup.active = data.active
    ticketGroup.users = users
    return await TicketGroup.save(ticketGroup)
  }

  public async get(id: number): Promise<TicketGroup> {
    return await TicketGroup.findOne(id, { relations: ['users'] })
  }

  public async change(id: number, entity: TicketGroup, assignedUsers?: number[]): Promise<TicketGroup> {
    const users: User[] = await User.findByIds(assignedUsers)
    const ticketGroup: TicketGroup = await TicketGroup.findOne(id)
    ticketGroup.name = entity.name
    ticketGroup.description = entity.description
    ticketGroup.icon = entity.icon
    ticketGroup.active = entity.active
    ticketGroup.users = users
    return await ticketGroup.save()
  }

  public async erase(id: number): Promise<DeleteResult> {
    return await TicketGroup.delete(id)
  }

  public async validateEntityExists(criteria: string | number): Promise<boolean> {
    let exists: boolean = false
    const entityFounded: TicketGroup = await createTicketGroupsQueryBuilder()
      .where('tg.id = :id', { id: criteria })
      .orWhere('tg.name = :name', { name: criteria })
      .getOne()
    if (entityFounded) exists = true
    return exists
  }

  public async getTicketGroupUsers(id: number): Promise<User[]> {
    const ticketGroup: TicketGroup = await TicketGroup.findOne(id, { relations: ['users'] })
    return ticketGroup.users
  }
}

export default TicketGroupService
