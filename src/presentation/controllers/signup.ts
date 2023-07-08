import { ServerError } from './../errors/missing-param-error'
import { Controller } from './../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { InvalidParamError, MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | any {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const element of requiredFields) {
        if (!httpRequest.body[element]) return badRequest(new MissingParamError(element))
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) return badRequest(new InvalidParamError('email'))
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
