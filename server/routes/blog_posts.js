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
    ACCESSIBLE_BLOG_POST_PROPERTIES 
}  = require('../constants')

const table = 'blog_posts'
const requiredKeys = R.keys(R.filter(i => i.required, ACCESSIBLE_BLOG_POST_PROPERTIES))

module.exports = (app, knex) => {
    // returns a list or filtered list of blog posts
    app.get(`${API_BASE_ENDPOINT}/blog_posts`,
    async (req, res) => {
        const resp = {}

        try{
            resp.data = await knex(table).select()
                .whereRaw(util.generateRawWhereQuery(req.query, R.keys(ACCESSIBLE_BLOG_POST_PROPERTIES)))
                .orderByRaw(util.generateOrderByStr(req.query, R.keys(ACCESSIBLE_BLOG_POST_PROPERTIES)))
        } catch(e) {
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })
}