const { APP_SECRET_KEY } = require('../../../../config')

module.exports = (chai, expect) => {
    describe('/users endpoints', () => {
            describe('GET basic users list - /api/users', () => {
                it('Should return an error when incorrect authentication headers are present', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users')
                    .set('authorization', 'testing')
                    .end((err, res) => {
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Shound send request and receive response', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users')
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
                it('Shound receive data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users')
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.data).to.exist
                        expect(res.body.data.length).to.not.equal(0)
                        expect(res.body.error).to.equal(false)
                        expect(res.body.msg).to.exist
                        done()
                    })
                })
                it('Should process query params', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users?first_name=be')
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should return single record using seed data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users?first_name=ben&last_name=bledsoe')
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        console.log(res.body)
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should escape unallowed characters', done => {
                    chai.request('http://localhost:4000')
                    .get("/api/users?first_name='ben'&last_name=;/bledsoe")
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(0)
                        done()
                    })
                })
                it('Should remove unallowed keys', done => {
                    chai.request('http://localhost:4000')
                    .get("/api/users?some_fake_key=test&first_name=ben&last_name=bledsoe")
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
            })

            // single user is returned
            // user is created
            // user is deleted
    })
}