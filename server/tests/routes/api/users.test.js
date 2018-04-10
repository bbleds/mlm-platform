module.exports = (chai, expect) => {
    describe('/users endpoints', () => {
            // general endpoint usage
            describe('GET basic users list - /api/users', () => {
                it('Shound send request and receive response', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users')
                    .end((err, res) => {
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
                // list is returned
                it('Shound receive data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users')
                    .end((err, res) => {
                        expect(res.body.data).to.exist
                        expect(res.body.data.length).to.not.equal(0)
                        expect(res.body.error).to.equal(false)
                        expect(res.body.msg).to.exist
                        done()
                    })
                })
                // list is returned with filters
                it('Should process query params', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users?first_name=be')
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should return single record using seed data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users?first_name=ben&last_name=bledsoe')
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
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(0)
                        done()
                    })
                })
            })

            // single user is returned
            // user is created
            // user is deleted
    })
}