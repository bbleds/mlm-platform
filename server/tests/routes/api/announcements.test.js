module.exports = (chai, expect) => {
    describe('/announcements endpoints', () => {
            // initial test for endpoint
            describe('GET blog posts - /api/announcements', () => {
                it('Shound return some data', done => {
                    chai.request('http://localhost:4000')
                    .get('/api/announcements')
                    .end((err, res) => {     
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
            })
    })
}