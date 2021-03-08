import { Notification } from './Notification'
import { ticketService } from '../inversify.config'
import { Server as SocketIO, Socket } from 'socket.io'

var connectedClients: any[] = []

function compare(a, b) {
  const userIdA: number = a.userId
  const userIdB: number = b.userId

  let comparision: number = 0
  if (userIdA > userIdB) {
    comparision = 1
  } else if (userIdA < userIdB) {
    comparision = -1
  }
  return comparision
}

export class SocketServer {
  private _io: SocketIO

  constructor(io: SocketIO) {
    this._io = io
    this.registerEvents()
  }

  private registerEvents(): void {
    this._io.on('connection', (socket: Socket) => {
      connectedClients.push({ socketId: socket.id })

      socket.on('connect_error', error => console.log(error))
      socket.on('disconnect', reason => {
        const index: number = connectedClients.findIndex(c => c.socketId === socket.id)
        if (index > -1) connectedClients.splice(index, 1)
      })

      this.userConnectLogin(socket)
      this.userConnectRefreshPage(socket)
      this.saveTSTicket(socket)
      this.saveTACTicket(socket)
      this.refreshTicketsTray(socket)
      this.refreshAuthTicketsTray(socket)
      this.takeTicket(socket)
      this.cancelTicket(socket)
      this.reassignTicket(socket)
      this.pauseTicket(socket)
      this.resumeTicket(socket)
      this.authorizeTicket(socket)
      this.declineAuthTicket(socket)
      this.clickNotification(socket)
    })
  }

  public userConnectRefreshPage(socket: Socket): void {
    socket.on('user:connect-refresh-page', data => {
      const { userId } = data

      if (userId != undefined) {
        for (let index in connectedClients) {
          let client: any = connectedClients[index]

          if (client.socketId === socket.id) {
            client['userId'] = userId

            const updatedClient: any = client[index]

            Object.assign(client, updatedClient)
          }
        }
        connectedClients.sort(compare)
      }
    })
  }

  public userConnectLogin(socket: Socket): void {
    socket.on('user:connect-login', data => {
      const { userId } = data
      const client: any = connectedClients.find(c => c.socketId === socket.id)

      if (client) {
        client['userId'] = userId
        const updatedClient: any = client
        Object.assign(client, updatedClient)
      } else {
        connectedClients.push({ socketId: socket.id, userId })
        connectedClients.sort(compare)
      }

      this._io.to(socket.id).emit('user:connect-login', { ok: true, message: 'Socket conectado!' })
    })
  }

  public onUserDisconnect(socket: Socket): void {
    socket.on('user:disconnect', data => {})
  }

  public saveTSTicket(socket: Socket): void {
    socket.on('TSTicket:created', async data => {
      const { ticketGroupUserIds, userCreate } = data

      for (let x = 0; x < ticketGroupUserIds.length; x++) {
        const userId: number = ticketGroupUserIds[x]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount, ticketsTrayCount } = result

        const client: any = connectedClients.find(client => client.userId === userId)

        if (client != undefined) {
          const socketId = client.socketId

          this._io.to(socketId).emit('TSTicket:created', {
            ok: true,
            notifications,
            notificationsCount,
            ticketsTrayCount,
            userCreate,
          })
        }
      }
    })
  }

  public saveTACTicket(socket: Socket): void {
    socket.on('TACTicket:created', async data => {
      const { usersWhoAuthorize, userCreate } = data

      for (let x = 0; x < usersWhoAuthorize.length; x++) {
        const userId: number = usersWhoAuthorize[x]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount, authTicketsCount } = result

        const client: any = connectedClients.find(client => client.userId === userId)

        if (client != undefined) {
          const socketId = client.socketId

          this._io.to(socketId).emit('TACTicket:created', {
            ok: true,
            notifications,
            notificationsCount,
            authTicketsCount,
            userCreate,
          })
        }
      }
    })
  }

  public refreshTicketsTray(socket: Socket): void {
    socket.on('tickets-tray:refresh', async data => {
      const { ticketGroupUserIds } = data

      for (let x = 0; x < ticketGroupUserIds.length; x++) {
        const userId: number = ticketGroupUserIds[x]
        const tickets: any[] = await ticketService.getTicketsTrayByUser(userId)
        const client: any = connectedClients.find(client => client.userId === userId)

        if (client != undefined) {
          const socketId: string = client.socketId
          this._io.to(socketId).emit('tickets-tray:refresh', { ok: true, tickets })
        }
      }
    })
  }

  public refreshAuthTicketsTray(socket: Socket): void {
    socket.on('authorized-tickets-tray:refresh', async data => {
      const { usersWhoAuthorize } = data

      for (let x = 0; x < usersWhoAuthorize.length; x++) {
        const userId: number = usersWhoAuthorize[x]
        const ticketsToAuthorize: any[] = await ticketService.getTicketsToAuthorizeByUser(userId)
        const client: any = connectedClients.find(client => client.userId === userId)

        if (client != undefined) {
          const socketId: string = client.socketId
          this._io.to(socketId).emit('authorized-tickets-tray:refresh', { ok: true, ticketsToAuthorize })
        }
      }
    })
  }

  public takeTicket(socket: Socket): void {
    socket.on('ticket:take', async data => {
      const { ticket, ticketGroupUserIds } = data

      for (let i = 0; i < ticketGroupUserIds.length; i++) {
        const userId: number = ticketGroupUserIds[i]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId: string = client.socketId
          this._io.to(socketId).emit('ticket:take', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
          })
        }
      }
    })
  }

  public cancelTicket(socket: Socket): void {
    socket.on('ticket:cancel', async data => {
      const { ticket, ticketGroupUserIds } = data

      for (let i = 0; i < ticketGroupUserIds.length; i++) {
        const userId: number = ticketGroupUserIds[i]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId = client.socketId
          this._io.to(socketId).emit('ticket:cancel', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
          })
        }
      }
    })
  }

  public reassignTicket(socket: Socket): void {
    socket.on('ticket:reassign', async data => {
      const { ticket, ticketGroupUserIds, userWhoReassign } = data

      for (let i = 0; i < ticketGroupUserIds.length; i++) {
        const userId: number = ticketGroupUserIds[i]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId = client.socketId
          this._io.to(socketId).emit('ticket:reassign', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
            userWhoReassign,
          })
        }
      }
    })
  }

  public refreshAllUserNotifications(socket: Socket): void {
    socket.on('all-users-notifications:refresh', async data => {
      const { ticketGroupUserIds } = data

      for (let i = 0; i < ticketGroupUserIds.length; i++) {
        const userId: number = ticketGroupUserIds[i]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount, authTicketsCount, ticketsTrayCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId: string = client.socketId
          this._io.to(socketId).emit('all-users-notifications:refresh', {
            ok: true,
            notifications,
            notificationsCount,
            authTicketsCount,
            ticketsTrayCount,
          })
        }
      }
    })
  }

  public pauseTicket(socket: Socket): void {
    socket.on('ticket:pause', async data => {
      const { ticket, ticketGroupUserIds } = data

      for (let i = 0; i < ticketGroupUserIds.length; i++) {
        const userId: number = ticketGroupUserIds[i]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId = client.socketId
          this._io.to(socketId).emit('ticket:pause', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
          })
        }
      }
    })
  }

  public resumeTicket(socket: Socket): void {
    socket.on('ticket:resume', async data => {
      const { ticket, ticketGroupUserIds } = data

      for (let i = 0; i < ticketGroupUserIds.length; i++) {
        const userId: number = ticketGroupUserIds[i]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId = client.socketId
          this._io.to(socketId).emit('ticket:resume', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
          })
        }
      }
    })
  }

  public authorizeTicket(socket: Socket): void {
    socket.on('ticket:authorize', async data => {
      const { ticket } = data
      const authorizeUsers: any[] = await ticketService.getAuthorizeUsersByTicket(ticket.id)

      for (let x = 0; x < authorizeUsers.length; x++) {
        const userId: number = authorizeUsers[x].userId
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount, authTicketsCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId: string = client.socketId
          this._io.to(socketId).emit('ticket:authorize', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
            authTicketsCount,
          })
        }
      }
    })
  }

  public ticketCompletelyAuthorized(socket: Socket): void {
    socket.on('ticket:completely-authorized', async data => {
      const { ticket, ticketGroupUserIds } = data

      for (let x = 0; x < ticketGroupUserIds.length; x++) {
        const userId: number = ticketGroupUserIds[x]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount, authTicketsCount, ticketsTrayCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId: string = client.socketId
          this._io.to(socketId).emit('ticket:completely-authorized', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
            authTicketsCount,
            ticketsTrayCount,
          })
        }
      }
    })
  }

  public declineAuthTicket(socket: Socket): void {
    socket.on('ticket-auth:decline', async data => {
      const { ticket } = data
      const authorizeUsers: any[] = await ticketService.getAuthorizeUsersByTicket(ticket.id)

      for (let x = 0; x < authorizeUsers.length; x++) {
        const userId: number = authorizeUsers[x].userId
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount, authTicketsCount } = result

        const client: any = connectedClients.find(client => client.userId === userId)

        if (client != undefined) {
          const socketId: string = client.socketId
          this._io.to(socketId).emit('ticket-auth:decline', {
            ok: true,
            ticket,
            notifications,
            notificationsCount,
            authTicketsCount,
          })
        }
      }
    })
  }

  public clickNotification(socket: Socket): void {
    socket.on('notification:click', async data => {
      const { ticketGroupUserIds } = data
      for (let i = 0; i < ticketGroupUserIds.length; i++) {
        const userId: number = ticketGroupUserIds[i]
        const result: any = await Notification.getGeneralNotificationsData(userId)
        const { notifications, notificationsCount } = result

        const client: any = connectedClients.find(c => c.userId === userId)

        if (client != undefined) {
          const socketId = client.socketId
          this._io.to(socketId).emit('notification:click', {
            ok: true,
            notificationsCount,
            notifications,
          })
        }
      }
    })
  }
}
