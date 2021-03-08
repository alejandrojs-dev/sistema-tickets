import dotenv, { DotenvConfigOutput } from 'dotenv'

class Enviroment {
  private _dotenv: DotenvConfigOutput

  constructor() {
    this._dotenv = dotenv.config({ encoding: 'utf-8' })
    if (this._dotenv.error) console.error(this._dotenv.error)
  }

  public local(): any {
    return {
      socketIO: {
        cors: {
          origin: 'http://tecnoline2.0.test',
          credentials: true,
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-type', 'Accept'],
        },
        pingTimeout: 1000,
      },
      server: {
        port: process.env.APP_PORT,
        app: {
          constants: {
            serviceLevel: parseInt(process.env.SERVICE_LEVEL),
            numberAuth: parseInt(process.env.NUMBER_AUTH),
          },
        },
      },
    }
  }

  public production(): any {
    return {
      socketIO: {
        cors: {
          origin: 'http://tecnoline2.0.test',
          credentials: true,
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-type', 'Accept'],
        },
        pingTimeout: 1000,
      },
    }
  }
}

export default new Enviroment()
