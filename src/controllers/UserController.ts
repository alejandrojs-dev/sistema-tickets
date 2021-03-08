import { injectable, inject } from 'inversify'
import TYPES from '../utils/types'
import UserService from '../services/UserService'
import User from '../entities/User'
import 'reflect-metadata'

@injectable()
class UserController {
  private _userService: UserService

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this._userService = userService
  }

  public async index(): Promise<User[]> {
    return await this._userService.all()
  }

  public async getUsersByGroup(groupId: number): Promise<User[]> {
    return await this._userService.getUsersByGroup(groupId)
  }
}

export default UserController
