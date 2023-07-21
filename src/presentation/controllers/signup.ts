import { AddAccount } from './../../domain/usecases/add-account'
import { Controller } from './../protocols/controller'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError, ok } from '../helpers/http-helper'
import { EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { name, email, password, passwordConfirmation } = httpRequest.body

      for (const element of requiredFields) {
        if (!httpRequest.body[element]) return badRequest(new MissingParamError(element))
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(email)) return badRequest(new InvalidParamError('email'))

      const account = this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
