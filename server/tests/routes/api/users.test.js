const { APP_SECRET_KEY } = require('../../../../config')
const { API_BASE_ENDPOINT }  = require('../../../constants')

module.exports = (chai, expect) => {
    describe('/users endpoints', () => {

        const userCreation = new Promise((resolve, reject) => {
            // user is created
            describe(`POST Create new user - ${API_BASE_ENDPOINT}/users`, () => {
                it('Should return an error when incorrect authenication headers are present', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', 'testing')
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Should return an error when post body does not contain all required keys', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({last_name:'testing', email: 'valid@email.com', bio: 'testing'})
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Should return an error when post body does contains invalid value for a required key', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({first_name:'testing', last_name:'', email: 'valid@email.com', bio: 'testing'})
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Should return an error when post body contains an invalid email', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({first_name:'testing', last_name:'testing', email: 'invalidemail.com', bio: 'testing'})
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Should allow creation of a user with allowed properties, strip out unallowed properties, and return the new user id', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({first_name:'testing_new_user', last_name:'testing', email: 'valid@email.com', bio: 'testing', created_on:'testing'})
                    .end((err, res) => {  
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        !res.body.error && res.body.data[0].user_id ? 
                            resolve(res.body.data[0].user_id) :
                            reject('Could not create user')
                        done()
                    })
                })
            })
        })

        userCreation
        .then((newUserId) => {
            // users list
            describe(`GET basic users list - ${API_BASE_ENDPOINT}/users`, () => {
                it('Should return an error when incorrect authentication headers are present', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', 'testing')
                    .end((err, res) => {
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('Shound send request and receive response', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.msg.length).to.not.equal(0)
                        done()
                    })
                })
                it('Shound receive data', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.data).to.exist
                        expect(res.body.data.length).to.not.equal(0)
                        expect(res.body.error).to.equal(false)
                        expect(res.body.msg).to.exist
                        done()
                    })
                })
                it('Should process query params', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?first_name=be`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should return single record using seed data', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?first_name=ben&last_name=bledsoe`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should escape unallowed characters', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?first_name='ben'&last_name=;/bledsoe`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(0)
                        done()
                    })
                })
                it('Should remove unallowed keys', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?some_fake_key=test&first_name=ben&last_name=bledsoe`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should allow a limit', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?limit=1`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should allow a pagination', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?limit=1&page=2&order_by=created_on&dir=desc`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                // SORTING
                it('Should allow sorting on accessible keys', done => {
                    // sort based on seed data
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?order_by=first_name&dir=desc`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.not.equal(1)
                        expect(res.body.data[0].first_name).to.equal('testing_new_user')
                        done()
                    })
                })
                it('Should handle sorting direction', done => {
                    // sort based on seed data
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?order_by=first_name&dir=asc`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.not.equal(1)
                        expect(res.body.data[0].first_name).to.equal('another')
                        done()
                    })
                })
            })

            // single user is returned
            describe('GET single user', () => {
                it('Should return an error when incorrect authenication headers are present', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users/1`)
                    .set('authorization', 'testing')
                    .end((err, res) => {
                        expect(res.body.error).to.equal(true)
                        expect(res.body.data.length).to.equal(0)
                        done()
                    })
                })
                it('Should retrieve a single user by id', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users/1`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
                it('Should retrieve a single user by id through query params', done => {
                    chai.request('http://localhost:4000')
                    .get(`${API_BASE_ENDPOINT}/users?id=1`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(false)
                        expect(res.body.data.length).to.equal(1)
                        done()
                    })
                })
            })

            // user is updated
            describe(`POST - update user - ${API_BASE_ENDPOINT}/users/:id`, () => {
                it('should not allow updating of a user if invalid authentication header is specified', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users/${newUserId}`)
                    .set('authorization', 'testing')
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('should not allow updating of a user if invalid values are specified for a required key', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users/${newUserId}`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({first_name: '', last_name: 'lastNameHere', email: 'email@example.com', bio: 'updated bio', unallowed_key: 'this is an unallowed key'})
                    .end((err, res) => {
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('should not allow updating of a user if a id is passed that does not exist', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users/9999999`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({first_name: '', last_name: 'lastNameHere', email: 'email@example.com', bio: 'updated bio', unallowed_key: 'this is an unallowed key'})
                    .end((err, res) => {
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('should not allow updating of a user if invalid email is specified', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users/${newUserId}`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({first_name: 'Sally', last_name: 'lastNameHere', email: 'invalidemailexample.com', bio: 'updated bio', unallowed_key: 'this is an unallowed key'})
                    .end((err, res) => {
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('should update a user and strip out invalid keys', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users/${newUserId}`)
                    .set('authorization', APP_SECRET_KEY)
                    .send({first_name: 'Sally', last_name: 'lastNameHere', email: 'validemail@example.com', bio: 'updated bio', unallowed_key: 'this is an unallowed key'})
                    .end((err, res) => {
                        expect(res.body.error).to.equal(false)
                        done()
                    })
                })
            })
            
            // user is deleted  
            describe(`DELETE - delete user - ${API_BASE_ENDPOINT}/users/:id`, () => {
                it('should not allow deletion of a user if invalid authentication header is specified', done => {
                    chai.request('http://localhost:4000')
                    .delete(`${API_BASE_ENDPOINT}/users/${newUserId}`)
                    .set('authorization', 'testing')
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('should not allow deletion of a user if invalid id is passed in', done => {
                    chai.request('http://localhost:4000')
                    .delete(`${API_BASE_ENDPOINT}/users/9999999`)
                    .set('authorization', APP_SECRET_KEY)
                    .end((err, res) => {                    
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
                it('should allow deletion of a user if valid authentication header is specified', done => {
                    chai.request('http://localhost:4000')
                    .delete(`${API_BASE_ENDPOINT}/users/${newUserId}`)
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