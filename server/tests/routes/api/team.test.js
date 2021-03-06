module.exports = (chai, expect) => {
    describe('/team endpoints', () => {
            // initial test for endpoint
            describe('GET blog posts - /api/team', () => {
                it('Shound return some data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/team')
                    .end((err, res) => {     
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
            })
    })
}