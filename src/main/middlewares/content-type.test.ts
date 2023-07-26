import request from 'supertest'
import app from '../config/app'

describe('Content Type middleware', () => {
  test('should return default Content Type as JSON ', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })

  test('should return xml Content Type when forced ', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test-content-type-xml')
      .expect('content-type', /xml/)
  })
})
