const R = require('ramda')
const util = require('../util/util.js')
const { APP_SECRET_KEY } = require('../../config')
const { generalRequestAuth } = require('../middlewares/auth')
const { API_BASE_ENDPOINT, USER_ACCESSIBLE_GET_PARAMS }  = require('../constants')
const table = 'users'

module.exports = (app, knex) => {
    
    // return all users or a filtered list of users
    app.get(`${API_BASE_ENDPOINT}/users`,
    generalRequestAuth,
    async (req, res) => {
        let resp = {}
        
        try {
            let orderByStr = util.generateOrderByStr(req.query, USER_ACCESSIBLE_GET_PARAMS)

            resp.data = await knex.select().table(table)
                .whereRaw(util.generateRawWhereQuery(req.query, USER_ACCESSIBLE_GET_PARAMS))
                .orderByRaw(util.generateOrderByStr(req.query, USER_ACCESSIBLE_GET_PARAMS))
        } catch(e){
            resp.error = true
            resp.msg = e
        }
        
        return res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })

    // get single user
    app.get(`${API_BASE_ENDPOINT}/users/:id`, 
    generalRequestAuth,
    async (req, res) => {
        let resp = {}

        try {
            resp.data = await knex.select().table(table).where({id:req.params.id})
        }catch(e){
            resp.error = true
            resp.msg = e
        }
        
        return res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })

    // create a user
    // app.post(`${API_BASE_ENDPOINT}/users/:id`)

    // update a user
    // delete a user
}