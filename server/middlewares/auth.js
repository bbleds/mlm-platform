// contains middleware methods used in auth processes as well as request validation
const R = require('ramda')
const { APP_SECRET_KEY } = require('../../config')
const util = require('../util/util.js')

module.exports = {
    // require authorization header on request that matches app secret key
    generalRequestAuth : (req, res, next) => {
        console.log('REQ HEADERS', req.headers)
        return !req.headers.authorization || req.headers.authorization !== APP_SECRET_KEY ? 
            res.status(401).send(util.standardRes([], 'Incorrect authorization key provided. Please try again', true)) :
            next()
    },
    // be sure that the request body contains data to work with. This is used as general validation on post requests
    validateRequestBody : (req, res, next) => {
        const { body } = req
        return !R.keys(body).length ? 
            res.status(400).send(util.standardRes([], 'No data provided in the request body. Please try again.', true)) : 
            next()
    }
}