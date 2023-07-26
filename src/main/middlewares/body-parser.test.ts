import request from 'supertest'
import app from '../config/app'

describe('Bodyparser middleware', () => {
  test('should parse body as JSON ', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Lucas' })
      .expect({ name: 'Lucas' })
  })
})
