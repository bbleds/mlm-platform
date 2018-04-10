// contains middleware methods used in auth processes

const { APP_SECRET_KEY } = require('../../config')
const util = require('../util/util.js')

module.exports = {
    // require authorization header on request that matches app secret key
    generalRequestAuth : (req, res, next) => {
        return !req.headers.authorization || req.headers.authorization !== APP_SECRET_KEY ? 
            res.status(401).send(util.standardRes({}, 'Incorrect authorization key provided. Please try again', true)) :
            next()
    }
}