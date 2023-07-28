import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/use-cases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/account-repository/account'

export const makeSignupController = (): SignUpController => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
