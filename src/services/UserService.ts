import 'reflect-metadata'
import { injectable } from 'inversify'
import { createUserQueryBuilder } from '../database/queryBuilders'
import User from '../entities/User'
import dTicketGroup from '../entities/dTicketGroup'

@injectable()
class UserService {
  public async all(): Promise<User[]> {
    return await User.find({ order: { user_id: 'ASC' } })
  }

  public async get(id: number): Promise<User> {
    return await User.findOne(id)
  }

  public async getUsersByGroup(groupId: number): Promise<User[]> {
    return await createUserQueryBuilder()
      .select(
        `
              u.user_id,
              u.username
            `,
      )
      .innerJoin(dTicketGroup, 'dtg', 'dtg.user_id = u.user_id AND dtg.ticket_group_id = :groupId', { groupId })
      .getRawMany()
  }
}

export default UserService
