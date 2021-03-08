import { injectable, inject } from 'inversify'
import Priority from '../entities/Priority'
import PriorityService from '../services/PriorityService'
import TYPES from '../utils/types'
import 'reflect-metadata'

@injectable()
class PriorityController {
  private _priorityService: PriorityService

  constructor(@inject(TYPES.PriorityService) priorityService: PriorityService) {
    this._priorityService = priorityService
  }

  public async index(): Promise<Priority[]> {
    return await this._priorityService.all()
  }
}

export default PriorityController
