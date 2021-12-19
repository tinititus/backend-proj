import { Error } from '../types'

export function createAndThrowError(message: string, status: number): never {
  const error = new Error(message) as Error
  error.statusCode = status
  throw error
}
