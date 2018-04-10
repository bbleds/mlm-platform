const R = require('ramda')
const util = require('../util/util.js')
const { APP_SECRET_KEY } = require('../../config')
const { generalRequestAuth } = require('../middlewares/auth')

module.exports = (app, knex) => {
    
    // return all users or a filtered list of users
    app.get('/api/users',
    generalRequestAuth,
    async (req, res) => {
        let resp = {}
        
        try {
            resp.data = await knex.select().table('users').whereRaw(util.rawFilterQuery(req.query))
        } catch(e){
            resp.error = true
            resp.msg = e
        }
        
        return res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })

    // get single user
    app.get('/api/users/:id', (req, res) => res.send({msg: `this is the id ${req.params.id}`}))
}