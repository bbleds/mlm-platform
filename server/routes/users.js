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

const usersEndpoint = `${API_BASE_ENDPOINT}/users`

const table = 'users'
const requiredKeys = R.keys(R.filter(i => i.required, ACCESSIBLE_USER_PROPERTIES))

module.exports = (app, knex) => {
    
    // return all users or a filtered list of users
    app.get(usersEndpoint,
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
    app.get(`${usersEndpoint}/:id`, 
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
    app.post(usersEndpoint,
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
    app.post(`${usersEndpoint}/:id`,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const resp = {}
        const { body } = req
        const filteredData = util.filterAndTrimData(ACCESSIBLE_USER_PROPERTIES, body)

        const existsResp = await util.checkRecordExists(knex, table, req.params.id)
        if (existsResp.error) return res.send(util.standardRes([], existsResp.msg, true))

        if (!R.keys(filteredData).length ||
            util.hasEmptyRequiredVals(requiredKeys, filteredData).length ||
            (filteredData.email && !emailValidator.validate(filteredData.email)) 
        ) return res.send(util.standardRes([], 'Please be sure to provide accepted values for at least one key if you wish to update a user', true))
        
        try{
            resp.data = await knex(table).where({id : req.params.id}).update(R.assoc('updated_on', knex.fn.now(), filteredData))
        } catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes([{success : resp.data}], resp.msg, resp.error))
    })

    // delete a user
    app.delete(`${usersEndpoint}/:id`,
    generalRequestAuth,
    async (req, res) => {
        const resp = {}

        const existsResp = await util.checkRecordExists(knex, table, req.params.id)
        if (existsResp.error) return res.send(util.standardRes([], existsResp.msg, true))

        try{
            resp.data = await knex(table).where({id : req.params.id}).del()
        } catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes([{success : resp.data}], resp.msg, resp.error))
    })

    // delete multiple users - can also function as a delete method for a single user
    app.delete(`${usersEndpoint}`,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const resp = {}
        
        try{
            res.data = await knex.raw(`DELETE FROM ${table} WHERE id in (?)`,[req.body.ids.split(',')])
        }
        catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes([{success : resp.data}], resp.msg, resp.error))
    })
}