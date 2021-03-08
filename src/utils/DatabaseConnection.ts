import { Connection, createConnection, getConnection } from 'typeorm'

class DatabaseConnection {
  constructor() {}

  public async init(): Promise<Connection> {
    try {
      const connection = await createConnection()

      console.log('Database connection successfully')

      return connection
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (getConnection().isConnected) await getConnection().close()
      else console.error('Error:Can´t close connection database when it´s not started')
    } catch (error) {
      console.error(error)
    }
  }
}

const dbConnection: DatabaseConnection = new DatabaseConnection()

export default dbConnection
