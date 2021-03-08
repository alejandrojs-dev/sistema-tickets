class ErrorHandler extends Error {
  public statusCode: number
  public typeError: string
  public errors: []

  constructor(statusCode: number, message: string, errors?: []) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
  }
}

export default ErrorHandler
