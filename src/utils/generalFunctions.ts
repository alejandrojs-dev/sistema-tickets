import fileSystem from 'fs'
import util from 'util'
import path from 'path'
import fileType, { FileTypeResult } from 'file-type'

const trim = (str: string): string => {
  const trimString = str.replace(/\s\s+/g, ' ').trim()
  return trimString
}

const readFileImageSync = (imgPath, mimeType): string => {
  const contentFile: string = fileSystem.readFileSync(imgPath, { encoding: 'base64' })
  return `data:${mimeType};base64,${contentFile}`
}
const readFileImageAsync = pathFile => util.promisify(fileSystem.readFile)(pathFile, { encoding: 'base64' }) //convert callback method to promise

const base64EncodeSync = (imgPath, mimeType): string => {
  return readFileImageSync(imgPath, mimeType)
}
const base64EncodeAsync = async (imgPath, mimeType): Promise<string> => {
  const contentFile: string = await readFileImageAsync(imgPath)
  return `data:${mimeType};base64,${contentFile}`
}

const getOriginalImageName = (img: string): string => {
  const index: number = img.indexOf('-') + 1
  const originalName: string = img.slice(index, img.length)
  return originalName
}

const getFileImageData = async (img): Promise<any> => {
  try {
    const fileImageData: any = {}
    const imgFullPath = path.join(__dirname, `../assets/uploads/${img}`)
    const fileTypeImage: FileTypeResult = await fileType.fromFile(imgFullPath)
    const base64Encoded: string = await base64EncodeAsync(imgFullPath, fileTypeImage.mime)
    const originalImageName: string = getOriginalImageName(img)
    const extensionImage: string = path.extname(img).replace('.', '')

    fileImageData.base64Encoded = base64Encoded
    fileImageData.originalName = originalImageName
    fileImageData.extension = extensionImage
    fileImageData.mimeType = fileTypeImage.mime

    return fileImageData
  } catch (error) {
    console.log(error)
  }
}

const findAndDeleteImage = (imgPath: string, filenameSearch: string): void => {
  if (!fileSystem.existsSync(imgPath)) {
    console.log(`No existe el directorio ${imgPath} para buscar el archivo`)
  } else {
    const files: string[] = fileSystem.readdirSync(imgPath)
    for (let i = 0; i < files.length; i++) {
      const filename = files[i]
      if (filename === filenameSearch) {
        fileSystem.unlinkSync(path.join(imgPath, filenameSearch))
      }
    }
  }
}

export { trim, getFileImageData, findAndDeleteImage }
