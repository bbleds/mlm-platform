const { APP_SECRET_KEY } = require('../../../../config')
const { API_BASE_ENDPOINT }  = require('../../../constants')

module.exports = (chai, expect) => {
    describe('/blog-posts endpoints', () => {

        const postCreation = new Promise((resolve, reject) => {
            describe(`POST blog posts - ${API_BASE_ENDPOINT}/blog-posts`, () => {
                it('Shound not create a new blog post when invalid authentication headers are present', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts`)
                    .send({title:'testing', content:'some content here', user_id: '1'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Shound not create a new blog post when invalid post data is present', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({someKey:'testing'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Shound not create a new blog post when post data does not contain all required keys', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({title:'tesitng'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Shound create a new blog post and strip out unallowed keys', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({title:'testing', content:'some content here', user_id: '1', some_other_key: 'testing'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        !res.body.error && res.body.data[0].blog_post_id ? 
                            resolve(res.body.data[0].blog_post_id) :
                            reject('Could not create blog-post')
                        done()
                    })
                })
            })
        })

        postCreation
        .then((newPostId) => {

            // get blog post listing
            describe(`GET blog posts - ${API_BASE_ENDPOINT}/blog-posts`, () => {
                it('Shound return blog posts', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog-posts`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.not.equal(0)
                        done()
                    })
                })
                it('Shound return a filtered list of blog posts', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog-posts?title=sample blog post 2`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Shound return a filtered list of blog posts in a certain order', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog-posts?order_by=title&dir=asc`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data[0].id).to.equal(1)
                        done()
                    })
                })
                it('Shound allow a limit', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/blog-posts?order_by=title&dir=asc&limit=1`)
                    .end((err, res) => {     
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
            })

            // update blog post
            describe(`POST blog posts - ${API_BASE_ENDPOINT}/blog-posts/:id`, () => {
                it('Shound not update a blog post if invalid authentication headers are present', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts/${newPostId}`)
                    .send({someKey:'testing', title:'z A change from original title z'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })

                it('Shound not update a blog post if invalid data is present', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts/${newPostId}`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({someKey:'testing'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })

                it('Shound not update a blog post if attempting to update by a id that does not exist', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts/99999999`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({someKey:'testing', title:'z A change from original title z'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })

                it('Shound update a blog post by id', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/blog-posts/${newPostId}`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({someKey:'testing', title:'z A change from original title z'})
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(false)
                        done()
                    })
                })
            })

            // delete blog posts
            describe(`DELETE blog posts - ${API_BASE_ENDPOINT}/blog-posts/:id`, () => {
                it('Shound not delete a blog post if invalid headers are present', done => {
                    chai.request('http://localhost:4000')
                    .delete(`${API_BASE_ENDPOINT}/blog-posts/${newPostId}`)
                    .set('authorization', 'testing')
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Shound return an error if the blog post does not exist', done => {
                    chai.request('http://localhost:4000')
                    .delete(`${API_BASE_ENDPOINT}/blog-posts/99999999`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Shound delete a blog post by id', done => {
                    chai.request('http://localhost:4000')
                    .delete(`${API_BASE_ENDPOINT}/blog-posts/${newPostId}`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {    
                        expect(res.body.error).to.equal(false)
                        done()
                    })
                })
            })
        })
    })
}