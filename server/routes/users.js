const R = require('ramda')
const util = require('../util/util.js')
const { APP_SECRET_KEY } = require('../../config')

const { 
    generalRequestAuth, 
    validateRequestBody 
} = require('../middlewares/auth')

const { 
    API_BASE_ENDPOINT, 
    ACCESSIBLE_USER_PROPERTIES 
}  = require('../constants')

const table = 'users'

module.exports = (app, knex) => {
    
    // return all users or a filtered list of users
    app.get(`${API_BASE_ENDPOINT}/users`,
    generalRequestAuth,
    async (req, res) => {
        let resp = {}
        
        try {
            resp.data = await knex.select().table(table)
                .whereRaw(util.generateRawWhereQuery(req.query, R.keys(ACCESSIBLE_USER_PROPERTIES)))
                .orderByRaw(util.generateOrderByStr(req.query, R.keys(ACCESSIBLE_USER_PROPERTIES)))
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
    app.post(`${API_BASE_ENDPOINT}/users`,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const { body } = req
        //  check that the body contains all required keys
        return !R.contains(R.keys(body), R.keys(R.filter(i => i.required, ACCESSIBLE_USER_PROPERTIES))) ?
            // trim values and send back the cleaned data
            res.send(util.standardRes(R.map( i =>  i.trim(), R.pickBy((val, key) => ACCESSIBLE_USER_PROPERTIES[key] , body)))) : 
            res.send(util.standardRes([], 'Please be sure to provide values for all required keys', true))
    })

    // update a user
    // delete a user
}