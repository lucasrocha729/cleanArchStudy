import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('should return account on success ', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Lucas',
        email: 'mail@mail.com',
        password: 'aaa',
        passwordConfirmation: 'aaa'
      })
      .expect(200)
  })
})
