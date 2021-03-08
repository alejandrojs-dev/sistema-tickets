import { getConnection } from 'typeorm'
import { ticketService, userService } from '../inversify.config'

export class Notification {
  public id: number
  public groupId: number
  public username: string
  public groupName: string
  public subGroupName: string
  public type: string
  public status: string
  public statusColor: string
  public description: string
  public backGroundColor: string
  public userImageProfile: string
  public createdDate: Date
  public reassigned: boolean
  public ticketGroupUserIds: number[]

  static create<T extends typeof Notification>(this: T, json: any): InstanceType<T> {
    const instance = new this() as InstanceType<T>

    instance.id = json.id
    instance.username = json.username
    instance.groupName = json.groupName
    instance.subGroupName = json.subGroupName
    instance.type = json.type
    instance.status = json.status
    instance.statusColor = json.statusColor
    instance.description = json.description
    instance.backGroundColor = json.backGroundColor
    instance.userImageProfile = json.userImageProfile
    instance.createdDate = json.createdDate
    instance.reassigned = json.reassigned
    instance.ticketGroupUserIds = json.ticketGroupUserIds

    return instance
  }

  static async getGeneralNotificationsData(userId: number): Promise<any> {
    const result: any = await getConnection().manager.query('CALL spr_get_general_notifications_data(?)', [userId])
    const resultData: any = {}

    if (result.length > 0) {
      const notifications: any[] = []
      const tickets: any[] = result[0]
      const notificationsCount: number = parseInt(result[1][0].notificationsCount)
      const authTicketsCount: number = parseInt(result[2][0].authTicketsCount)
      const ticketsTrayCount: number = parseInt(result[3][0].ticketsTrayCount)

      for (const ticket of tickets) {
        let users: any[] = await userService.getUsersByGroup(ticket.ticketGroupId)
        users = users.map(user => user.user_id)

        const json: any = {}

        json.id = ticket.id
        json.groupId = ticket.ticketGroupId
        json.username = ticket.userTicketCreate
        json.groupName = ticket.groupName
        json.subGroupName = ticket.subGroupName
        json.type = ticket.ticketType
        json.status = ticket.ticketStatus
        json.statusColor = ticket.ticketStatusColor
        json.description = ticket.ticketDescription
        json.backGroundColor = ticket.backGroundColor
        json.userImageProfile = ticket.userImageProfile
        json.createdDate = ticket.createdAt
        json.reassigned = ticket.reassigned
        json.ticketGroupUserIds = users

        const notification: Notification = Notification.create(json)

        notifications.push(notification)
      }

      resultData.notifications = notifications
      resultData.notificationsCount = notificationsCount
      resultData.authTicketsCount = authTicketsCount
      resultData.ticketsTrayCount = ticketsTrayCount
    }
    return resultData
  }
}
