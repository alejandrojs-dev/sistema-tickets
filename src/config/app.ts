import dotenv from 'dotenv'

const result = dotenv.config({
  encoding: 'utf-8',
})

if (result.error) {
  console.error(result.error)
}

export const appConfig = {
  database: {
    connectionName: process.env.DB_CONNECTION_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
  },
  constants: {
    SERVICE_LEVEL: process.env.SERVICE_LEVEL,
    NUMBER_AUTH: process.env.NUMBER_AUTH,
  },
  app: {
    PORT: process.env.PORT || process.env.APP_PORT,
  },
}
