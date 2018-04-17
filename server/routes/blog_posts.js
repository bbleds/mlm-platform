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

const blogPostsEndpoint = `${API_BASE_ENDPOINT}/blog-posts`
const table = 'blog_posts'
const requiredKeys = R.keys(R.filter(i => i.required, ACCESSIBLE_BLOG_POST_PROPERTIES))

module.exports = (app, knex) => {
    // returns a list or filtered list of blog posts
    app.get(blogPostsEndpoint,
    async (req, res) => {
        const resp = {}

        try{
            resp.data = await knex(table).select()
                .whereRaw(util.generateRawWhereQuery(ACCESSIBLE_BLOG_POST_PROPERTIES, req.query))
                .orderByRaw(util.generateOrderByStr(ACCESSIBLE_BLOG_POST_PROPERTIES, req.query))
                .limit(util.generateLimit(req.query))
                .offset(util.generateOffset(req.query))
        } catch(e) {
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })

    // create blog posts
    app.post(blogPostsEndpoint,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const resp = {}
        const { body } = req
        const filteredData = util.filterAndTrimData(ACCESSIBLE_BLOG_POST_PROPERTIES, body)
        const hasRequiredKeys = R.difference(requiredKeys, R.keys(body)).length === 0

        if (!R.keys(filteredData).length ||
            util.hasEmptyRequiredVals(requiredKeys, filteredData).length || 
            !hasRequiredKeys
        ) return res.send(util.standardRes([], 'Please be sure to provide accepted values for all required keys', true))

        try{
            const insertResp = await knex(table).insert(filteredData)
            resp.data = [{blog_post_id : insertResp[0]}]
        } catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes(resp.data, resp.msg, resp.error))
    })

    // update blog posts
    app.post(`${blogPostsEndpoint}/:id`,
    generalRequestAuth,
    validateRequestBody,
    async (req, res) => {
        const resp = {}
        const { body } = req
        const filteredData = util.filterAndTrimData(ACCESSIBLE_BLOG_POST_PROPERTIES, body)

        if (!R.keys(filteredData).length ||
            util.hasEmptyRequiredVals(requiredKeys, filteredData).length 
        ) return res.send(util.standardRes([], 'Please be sure to provide accepted values for at least one key if you wish to update a blog post', true))

        try{
            resp.data = await knex(table).where({id : req.params.id}).update(R.assoc('updated_on', knex.fn.now(), filteredData))
        } catch(e){
            resp.error = true
            resp.msg = e
        }

        res.send(util.standardRes([{success : resp.data}], resp.msg, resp.error))
    })

    // delete blog posts
}