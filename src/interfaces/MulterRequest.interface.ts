import express from 'express'

export interface MulterRequest extends express.Request {
  file: any
}
