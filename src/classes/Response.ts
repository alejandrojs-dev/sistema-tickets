import express from 'express'

export class Response {
  private res: express.Response

  constructor(res: express.Response) {
    this.res = res
  }

  public giveBackJson(json: any): express.Response<any> {
    return this.res.status(json.statusCode).json(json)
  }
}
