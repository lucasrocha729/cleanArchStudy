import { EmailValidatorAdapter } from './email-validator'

describe('Email validator Adapter', () => {
  test('Should be return faslse if validator returns false ', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
