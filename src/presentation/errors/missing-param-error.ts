export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
  }
}

export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
  }
}

export class ServerError extends Error {
  constructor () {
    super('Internal Server Error')
  }
}
