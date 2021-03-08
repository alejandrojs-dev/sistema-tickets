import { injectable } from 'inversify'
import Priority from '../entities/Priority'
import 'reflect-metadata'

@injectable()
class PriorityService {
  public async all(): Promise<Priority[]> {
    return await Priority.find()
  }
}

export default PriorityService
