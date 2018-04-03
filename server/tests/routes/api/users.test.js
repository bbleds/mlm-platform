module.exports = (chai, expect) => {
    describe('/users endpoints', () => {
            // initial test for endpoint
            describe('GET basic users list - /api/users', () => {
                it('Shound return some data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/users')
                    .end((err, res) => {
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
            })
    })
}