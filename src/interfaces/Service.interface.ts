export interface IService {
  all(): Promise<any[]>
  save(entity: any): Promise<any>
  get(id: number): Promise<any>
  change(id: number, entity: any): Promise<any>
  erase(id: number): Promise<any>
}
