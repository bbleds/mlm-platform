const { APP_SECRET_KEY } = require('../../../../config')
const { API_BASE_ENDPOINT }  = require('../../../constants')

module.exports = (chai, expect) => {
    describe('/users endpoints', () => {
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
            // SORTING
            it('Should allow sorting on accessible keys', done => {
                // sort based on seed data
                chai.request('http://localhost:4000')
                .get(`${API_BASE_ENDPOINT}/users?order_by=first_name&dir=desc`)
                .set('authorization', APP_SECRET_KEY)
                .end((err, res) => {
                    expect(res.body.error).to.equal(false)
                    expect(res.body.data.length).to.not.equal(1)
                    expect(res.body.data[0].first_name).to.equal('dayrin')
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
                    expect(res.body.data[0].first_name).to.equal('ben')
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
            })
            
            // user is created
            describe('create new user', () => {
                it('Should return an error when incorrect authenication headers are present', done => {
                    chai.request('http://localhost:4000')
                    .post(`${API_BASE_ENDPOINT}/users`)
                    .set('authorization', 'testing')
                    .end((err, res) => {                        
                        expect(res.body.error).to.equal(true)
                        done()
                    })
                })
            })
            // user is updated
            // user is deleted
    })
}