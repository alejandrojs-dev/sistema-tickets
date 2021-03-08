import express, { Application } from 'express'
import { Server } from 'http'
import morgan from 'morgan'
import cors from 'cors'

class App {
  public _app: Application
  public _port: number
  public _server: Server

  constructor(port: number) {
    this._app = express()
    this._port = port
    this._server = this.initServer()
  }

  get server() {
    return this._server
  }

  set server(value) {
    this._server = value
  }

  private initServer(): Server {
    return this._app.listen(this._port, (): void => console.log(`Server started on port ${this._port}`))
  }

  public initMiddlewares(): void {
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(morgan('dev'))
    this._app.use(cors())
  }
}

export default App
