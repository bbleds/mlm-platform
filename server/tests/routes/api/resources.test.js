module.exports = (chai, expect) => {
    describe('/resources endpoints', () => {
            // initial test for endpoint
            describe('GET blog posts - /api/resources', () => {
                it('Shound return some data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/resources')
                    .end((err, res) => {     
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
            })
    })
}