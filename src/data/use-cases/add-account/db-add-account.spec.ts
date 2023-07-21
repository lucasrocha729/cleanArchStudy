import { DbAddAccount } from './db-add-account'

describe('DbAddAccount use cases', () => {
  test('should call encrypter with correct password ', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await Promise.resolve('hashed_value')
      }
    }
    const encrypterStub = new EncrypterStub()

    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_mail',
      password: 'valid_password'
    }
    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
