import { httpRequest, httpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const element of requiredFields) {
      if (!httpRequest.body[element]) return badRequest(new MissingParamError(element))
    }

    return {
      statusCode: 200,
      body: 'Success'
    }
  }
}
