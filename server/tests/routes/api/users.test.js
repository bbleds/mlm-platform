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
                it('Shound receive filtered data when filters are passed in', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users?first_name=be')
                    .end((err, res) => {
                        console.log('response---------------',res.body)
                        done()
                    })
                })
            })

            // single user is returned
            // user is created
            // user is deleted
    })
}