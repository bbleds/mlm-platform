const R = require('ramda')

module.exports = {
    // returns object for standard responses from API
    standardRes : (data, msg = 'The operation was successful', error = false) => {
        return {
            data,
            msg,
            error
        }
    },
    // returns raw text for sql query with flexible matching -- you should pass validated data as the "query" argument
    rawFilterQuery : (query = {}) => {
        return R.keys(query).reduce((acc, val) => acc + `${val}="${query[val]}" or ${val} LIKE "%${query[val]}%"`, ``)
    }
}