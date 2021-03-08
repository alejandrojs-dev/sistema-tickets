import { injectable } from 'inversify'
import { DeleteResult } from 'typeorm'
import { createTicketSubGroupQueryBuilder } from '../database/queryBuilders'
import TicketSubGroup from '../entities/TicketSubGroup'
import TicketGroup from '../entities/TicketGroup'
import TicketType from '../entities/TicketType'
import User from '../entities/User'
import 'reflect-metadata'

@injectable()
class TicketSubGroupService {
  public async all(): Promise<TicketSubGroup[]> {
    return await createTicketSubGroupQueryBuilder()
      .innerJoin(TicketGroup, 'tg', 'tg.id = ts.group_ticket_id')
      .innerJoin(TicketType, 'tt', 'tt.id = ts.ticket_type_id')
      .select(
        `
        ts.id,
        tg.id as ticketGroupId,
        tt.id as ticketTypeId,
        tg.name AS groupName,
        tt.type AS ticketType,
        ts.name AS subGroupName,
        ts.service_level AS serviceLevel,
        ts.number_auth AS numberAuth,
        ts.icon,
        ts.active
      `,
      )
      //.where('tg.active = :active', { active: 1 })
      .orderBy('ts.name', 'DESC')
      .getRawMany()
  }

  public async save(entity: TicketSubGroup, usersWhoAuthorize: number[]): Promise<TicketSubGroup> {
    const users: User[] = await User.findByIds(usersWhoAuthorize)
    if (usersWhoAuthorize.length > 0) {
      entity.usersWhoAuthorize = users
    }
    const savedTS = await TicketSubGroup.save(entity)
    return await this.get(savedTS.id, savedTS.ticket_type_id)
  }

  public async get(id: number, ticketTypeId: number): Promise<TicketSubGroup> {
    if (ticketTypeId === 1) {
      //TAC
      return await createTicketSubGroupQueryBuilder()
        .leftJoinAndMapOne('ts.ticketGroup', TicketGroup, 'tg', 'tg.id = ts.group_ticket_id')
        .leftJoinAndMapOne('ts.ticketType', TicketType, 'tt', 'tt.id = ts.ticket_type_id')
        .innerJoinAndSelect('ts.usersWhoAuthorize', 'u')
        .where('ts.id = :id', { id })
        .select([
          'ts.id',
          'tg.id',
          'tg.name',
          'ts.name',
          'tt.id',
          'tt.type',
          'ts.service_level',
          'ts.number_auth',
          'ts.active',
          'ts.icon',
          'u.user_id',
        ])
        .getOne()
    }

    if (ticketTypeId === 2) {
      //TS
      return await createTicketSubGroupQueryBuilder()
        .leftJoinAndMapOne('ts.ticketGroup', TicketGroup, 'tg', 'tg.id = ts.group_ticket_id')
        .leftJoinAndMapOne('ts.ticketType', TicketType, 'tt', 'tt.id = ts.ticket_type_id')
        .where('ts.id = :id', { id })
        .select([
          'ts.id',
          'tg.id',
          'tg.name',
          'ts.name',
          'tt.id',
          'tt.type',
          'ts.service_level',
          'ts.number_auth',
          'ts.active',
          'ts.icon',
        ])
        .getOne()
    }
  }

  public async change(id: number, entity: TicketSubGroup, usersWhoAuthorize: number[]): Promise<TicketSubGroup> {
    const users: User[] = await User.findByIds(usersWhoAuthorize)
    const ticketSubGroup: TicketSubGroup = await TicketSubGroup.findOne(id)
    ticketSubGroup.group_ticket_id = entity.group_ticket_id
    ticketSubGroup.ticket_type_id = entity.ticket_type_id
    ticketSubGroup.name = entity.name
    ticketSubGroup.service_level = entity.service_level
    ticketSubGroup.number_auth = entity.number_auth
    ticketSubGroup.icon = entity.icon
    ticketSubGroup.active = entity.active
    if (usersWhoAuthorize.length > 0) {
      ticketSubGroup.usersWhoAuthorize = users
    }

    const updatedTS = await ticketSubGroup.save()
    return await this.get(updatedTS.id, updatedTS.ticket_type_id)
  }

  public async erase(id: number): Promise<DeleteResult> {
    return await TicketSubGroup.delete(id)
  }

  public async validateEntityExists(criteria: any): Promise<boolean> {
    let exists: boolean = false
    const entityFounded: TicketSubGroup = await createTicketSubGroupQueryBuilder()
      .where('ts.group_ticket_id :group_ticket_id AND ts.name = :name', {
        name: criteria.name,
        group_ticket_id: criteria.groupTicketId,
      })
      .orWhere('ts.group_ticket_id :group_ticket_id AND ts.id = :id', {
        id: criteria.id,
        group_ticket_id: criteria.groupTicketId,
      })
      .getRawOne()

    if (entityFounded) exists = true
    return exists
  }
}

export default TicketSubGroupService
