import { Server as SocketIO } from 'socket.io'
import App from './classes/App'
import { SocketServer } from './classes/SocketServer'
import ticketTypesRoutes from './routes/ticketType.routes'
import ticketGroupRoutes from './routes/ticketGroup.routes'
import ticketSubGroupRoutes from './routes/ticketSubGroup.routes'
import ticketStatusRoutes from './routes/ticketStatus.routes'
import ticketRoutes from './routes/ticket.routes'
import userRoutes from './routes/user.routes'
import priorityRoutes from './routes/priorities.routes'
import errorHandling from './middlewares/errorHandling.middleware'
import Enviroment from './utils/Enviroment'
import dbConnection from './utils/DatabaseConnection'

export class APITickets extends App {
  constructor(port: number) {
    super(port)
    this.initDependencies()
  }

  private initDatabaseConnection(): void {
    dbConnection.init()
  }

  private initRoutes(): void {
    this._app.use('/v1/ticketTypes', ticketTypesRoutes)
    this._app.use('/v1/ticketGroups', ticketGroupRoutes)
    this._app.use('/v1/ticketSubGroups', ticketSubGroupRoutes)
    this._app.use('/v1/ticketStatus', ticketStatusRoutes)
    this._app.use('/v1/tickets', ticketRoutes)
    this._app.use('/v1/users', userRoutes)
    this._app.use('/v1/priorities', priorityRoutes)
    this._app.use(errorHandling)
  }

  private initDependencies(): void {
    try {
      this.initDatabaseConnection()
      this.initMiddlewares()
      this.initRoutes()
      this.initSocketServer()
    } catch (error) {
      console.log(error)
    }
  }

  private initSocketServer(): void {
    const {
      socketIO: {
        cors: { origin, credentials, methods, allowedHeaders },
        pingTimeout,
      },
    } = Enviroment.local()

    const io: SocketIO = new SocketIO(this._server, {
      cors: { origin, credentials, methods, allowedHeaders },
      pingTimeout,
    })
    const socketServer: SocketServer = new SocketServer(io)
  }
}
