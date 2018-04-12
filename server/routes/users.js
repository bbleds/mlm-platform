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
            resp.data = await knex(table).select()
                .whereRaw(util.generateRawWhereQuery(ACCESSIBLE_USER_PROPERTIES, req.query))
                .orderByRaw(util.generateOrderByStr(ACCESSIBLE_USER_PROPERTIES, req.query))
                .limit(util.generateLimit(req.query))
                .offset(util.generateOffset(req.query))
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
            resp.data = await knex(table).select().where({id:req.params.id})
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
        const resp = {}
        const { body } = req
        const filteredData = util.filterAndTrimData(ACCESSIBLE_USER_PROPERTIES, body)
        const hasRequiredKeys = R.difference(requiredKeys, R.keys(body)).length === 0

        if (!R.keys(filteredData).length ||
            util.hasEmptyRequiredVals(requiredKeys, filteredData).length || 
            !hasRequiredKeys ||
            !emailValidator.validate(filteredData.email) 
        ) return res.send(util.standardRes([], 'Please be sure to provide accepted values for all required keys and a valid email address', true))

        try{
            const insertResp = await knex(table).insert(R.assoc('permissions', 'general', filteredData))
            resp.data = [{user_id : insertResp[0]}]
        } catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })

    // update a user
    app.post(`${API_BASE_ENDPOINT}/users/:id`,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const resp = {}
        const { body } = req
        const filteredData = util.filterAndTrimData(ACCESSIBLE_USER_PROPERTIES, body)

        if (!R.keys(filteredData).length ||
            util.hasEmptyRequiredVals(requiredKeys, filteredData).length ||
            (filteredData.email && !emailValidator.validate(filteredData.email)) 
        ) return res.send(util.standardRes([], 'Please be sure to provide accepted values for at least one key and a valid email address if you wish to update the email property', true))
        
        try{
            resp.data = await knex(table).where({id : req.params.id}).update(filteredData)
        } catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes([{success : resp.data}], resp.msg, resp.error))
    })

    // delete a user
    app.delete(`${API_BASE_ENDPOINT}/users/:id`,
    generalRequestAuth,
    async (req, res) => {
        const resp = {}

        try{
            resp.data = await knex(table).where({id : req.params.id}).del()
        } catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes([{success : resp.data}], resp.msg, resp.error))
    })
}