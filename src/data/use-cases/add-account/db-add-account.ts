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
    await this.addAccountReporitory.add(Object.assign({}, account, { password: hashedPassword }))

    const accountCreate: AccountModel = {
      id: '',
      ...account
    }

    return await Promise.resolve(accountCreate)
  }
}
