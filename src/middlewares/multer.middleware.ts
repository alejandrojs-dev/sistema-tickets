import express from 'express'
import multer from 'multer'
import path from 'path'
import { HttpStatus } from '../utils/HttpStatusesEnum'
import TicketGroup from '../entities/TicketGroup'
import ErrorHandler from '../classes/ErrorHandler'
import { findAndDeleteImage } from '../utils/generalFunctions'

const imgFilter = (req: express.Request, file: Express.Multer.File, cb): void => {
  const filetypes: RegExp = /jpeg|jpg|png|gif/
  const matchMimeType: boolean = filetypes.test(file.mimetype)
  const matchExtName: boolean = filetypes.test(path.extname(file.originalname))
  if (matchMimeType && matchExtName) {
    cb(null, true)
  } else {
    cb(
      new ErrorHandler(
        HttpStatus.BAD_REQUEST,
        'La imagen no tiene un formato válido. Formatos soportados: jpeg/jpg/png/gif',
      ),
      false,
    )
  }
}

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req: express.Request, file: Express.Multer.File, cb): void => {
    cb(null, './src/assets/uploads/')
  },
  filename: async (req: express.Request, file: Express.Multer.File, cb): Promise<void> => {
    if (req.params.id) {
      const imgPath: string = path.join(__dirname, `../assets/uploads`)
      const id: number = Number(req.params.id)
      const ticketGroup: TicketGroup = await TicketGroup.findOne(id)
      //findAndDeleteImage(imgPath, ticketGroup.img)
    }
    const uniqueSuffix: string = `${Date.now()}${Math.round(Math.random() * 1e9)}`
    const identifier: string = `${uniqueSuffix}-${file.originalname}`
    cb(null, identifier)
  },
})

const uploadMulter = multer({ storage: storage, fileFilter: imgFilter }).single('file')
export default uploadMulter
