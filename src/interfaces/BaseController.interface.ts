import { DeleteResult } from 'typeorm'

export interface IBaseController {
  index(): Promise<any[]>
  store(entity: any): Promise<any>
  show(id: number): void
  update(id: number, entity: any): Promise<any>
  delete(id: number): Promise<DeleteResult>
}
