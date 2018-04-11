const R = require('ramda')
const emailValidator = require('email-validator')
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
const requiredKeys = R.keys(R.filter(i => i.required, ACCESSIBLE_USER_PROPERTIES))

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
        
        res.send(util.standardRes(resp.data, resp.msg, resp.error))
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
        
        res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })

    // create a user
    app.post(`${API_BASE_ENDPOINT}/users`,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const { body } = req
        const emptyRequiredVals = R.keys(R.pickBy((val, key) => requiredKeys.includes(key) && !val.trim(), body)).length
        const hasRequiredKeys = R.difference(requiredKeys, R.keys(body)).length === 0

        if (emptyRequiredVals || !hasRequiredKeys || !emailValidator.validate(body.email.trim())) return res.send(util.standardRes([], 'Please be sure to provide accepted values for all required keys and a valid email address', true))

        try{
            const resp = await knex(table).insert(R.assoc('permissions', 'general', R.map( i => i.trim(), R.pickBy((val, key) => ACCESSIBLE_USER_PROPERTIES[key] , body))))
            res.send(util.standardRes([{user_id:resp[0]}]))
        } catch(e){
            res.send(util.standardRes([], `The following error occurred when creating this user: ${e}`, true))
        }
    })

    // update a user
    app.post(`${API_BASE_ENDPOINT}/users/:id`,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const { body } = req
        // filter out unallowed keys
        const filteredData = R.pickBy((val, key) => R.keys(ACCESSIBLE_USER_PROPERTIES).includes(key), body)
        // check if we have any values that are invalid for required keys
        const emptyRequiredVals = R.keys(R.pickBy((val, key) => requiredKeys.includes(key) && !val.trim(), filteredData)).length

        if (emptyRequiredVals || !R.keys(filteredData).length || (body.email && !emailValidator.validate(body.email.trim())) ) res.send(util.standardRes([], 'Please be sure to provide accepted values for at least one key and a valid email address if you wish to update the email property', true))
        
        // update user
        try{
            const resp = await knex(table).where({id : req.params.id}).update(R.map(i => i.trim(), filteredData))
            res.send(util.standardRes())
        } catch(e){
            res.send(util.standardRes([], `The following error occurred when updating this user: ${e}`, true))
        }
    })
    // delete a user
}