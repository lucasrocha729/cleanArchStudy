import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountReporitory } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountReporitory: AddAccountReporitory

  constructor (encrypter: Encrypter, addAccountReporitory: AddAccountReporitory) {
    this.encrypter = encrypter
    this.addAccountReporitory = addAccountReporitory
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const accountCreated = await this.addAccountReporitory.add(Object.assign({}, account, { password: hashedPassword }))

    return await Promise.resolve(accountCreated)
  }
}
