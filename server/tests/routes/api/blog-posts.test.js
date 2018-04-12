const { APP_SECRET_KEY } = require('../../../../config')
const { API_BASE_ENDPOINT }  = require('../../../constants')

module.exports = (chai, expect) => {
    describe('/blog-posts endpoints', () => {

            describe('GET blog posts - /api/blog-posts', () => {
                it('Shound return blog posts', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog_posts`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.not.equal(0)
                        done()
                    })
                })
                it('Shound return a filtered list of blog posts', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog_posts?title=sample blog post 2`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Shound return a filtered list of blog posts in a certain order', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog_posts?order_by=title&dir=asc`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data[0].id).to.equal(1)
                        done()
                    })
                })
                it('Shound allow a limit', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog_posts?order_by=title&dir=asc&limit=1`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
            })
    })
}