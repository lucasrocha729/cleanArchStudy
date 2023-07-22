import { AddAccountReporitory } from './../../protocols/add-account-reporitory'
import { AccountModel, AddAccountModel, Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountReporitoryStub: AddAccountReporitory
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }

  return new EncrypterStub()
}
const makeAddAccountReporitoryStub = (): AddAccountReporitory => {
  class AddAccountReporitoryStub implements AddAccountReporitory {
    async add (value: AddAccountModel): Promise<AccountModel> {
      const fakeAccount: AccountModel = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_mail',
        password: 'hashed_password'
      }

      return await Promise.resolve(fakeAccount)
    }
  }

  return new AddAccountReporitoryStub()
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountReporitoryStub = makeAddAccountReporitoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountReporitoryStub)

  return {
    sut,
    encrypterStub,
    addAccountReporitoryStub
  }
}

describe('DbAddAccount use cases', () => {
  test('should call encrypter with correct password ', async () => {
    const { sut, encrypterStub } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_mail',
      password: 'valid_password'
    }
    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())

    const accountData = {
      name: 'valid_name',
      email: 'valid_mail',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct data ', async () => {
    const { sut, addAccountReporitoryStub } = makeSut()

    const addSpy = jest.spyOn(addAccountReporitoryStub, 'add')

    const accountData = {
      name: 'valid_name',
      email: 'valid_mail',
      password: 'valid_password'
    }
    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_mail',
      password: 'hashed_password'
    })
  })

  test('should throw if addAccountReporitory throws', async () => {
    const { sut, addAccountReporitoryStub } = makeSut()

    jest.spyOn(addAccountReporitoryStub, 'add').mockRejectedValueOnce(new Error())

    const accountData = {
      name: 'valid_name',
      email: 'valid_mail',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(promise).rejects.toThrow()
  })
})
