module.exports = (chai, expect) => {
    describe('/pages endpoints', () => {
            // initial test for endpoint
            describe('GET blog posts - /api/pages', () => {
                it('Shound return some data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/pages')
                    .end((err, res) => {     
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
            })
    })
}