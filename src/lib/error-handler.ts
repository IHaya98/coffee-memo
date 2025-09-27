export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export const handleError = (error: unknown) => {
  console.error('Error:', error)
  
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      isOperational: error.isOperational,
    }
  }

  return {
    message: 'Internal Server Error',
    statusCode: 500,
    isOperational: false,
  }
}
