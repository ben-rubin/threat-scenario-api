const request = require('supertest')
import app from '../boot'

describe('Index route', () => {
    it('should return 403 Unauthorized', async () => {
        const res = await request(app).get('/threat-scenario')
        expect(res.statusCode).toEqual(403)
    })
})
