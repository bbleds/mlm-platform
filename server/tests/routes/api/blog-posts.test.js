module.exports = (chai, expect) => {
    describe('/blog-posts endpoints', () => {
            // initial test for endpoint
            describe('GET blog posts - /api/blog-posts', () => {
                it('Shound return some data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/blog-posts')
                    .end((err, res) => {     
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
            })
    })
}