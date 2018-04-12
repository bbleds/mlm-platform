const R = require('ramda')
const SqlString = require('sqlstring')
const { USER_ACCESSIBLE_GET_PARAMS } = require('../constants')

module.exports = {

    // returns object for standard responses from API
    standardRes : (data=[], msg = 'The operation was successful', error = false) => {
        return {
            data,
            msg,
            error
        }
    },

    // returns raw text for sql query with flexible matching. Also escapes input chars
    generateRawWhereQuery : (allowedDataObj = {}, query = {}) => {

        // filter out unallowed keys
        let arr = R.keys(R.pickBy((val, key) => allowedDataObj[key] && allowedDataObj[key].readable, query))

        return arr.reduce( (acc, val, index) => 
            {   
                return acc + 
                `${ index == arr.length-1 && arr.length > 1 ? "AND" : "" } 
                ( ${ val }=${ SqlString.escape(query[val].toLowerCase()) } or ${ val } LIKE ${ SqlString.escape('%'+query[val].toLowerCase()+'%') } )
                ` 
            },
            ``
        )
    },

    // returns a string to be used in knex "order by" clause
    generateOrderByStr : (allowedDataObj = {}, query = {}) => {
        
        return R.keys(query).includes('order_by') && allowedDataObj[query.order_by] && allowedDataObj[query.order_by].readable ? 
                `${query.order_by} 
                    ${
                        query.dir && (query.dir.toUpperCase() == 'ASC' || query.dir.toUpperCase() == 'DESC') ? 
                        query.dir.toUpperCase() : 
                        'DESC'
                    }
                ` : 
                'created_on DESC'
    },

    // generate a limit for use in a query
    generateLimit : query => query.limit ? parseInt(query.limit) : 25,

    // generate an offset for use in a query
    generateOffset : query => query.page && parseInt(query.page)-1 >= 0  ? module.exports.generateLimit(query) * (parseInt(query.page)-1) : 0,

    // returns an array of key names of any key value pairs that are required but contain empty values.
    hasEmptyRequiredVals : (requiredKeys, data) => R.keys(R.pickBy((val, key) => requiredKeys.includes(key) && !val.trim(), data)),
    
    // filter out all unallowed keys in an object and trim each value
    filterAndTrimData : (allowedDataObj, data) => R.map( i => i.trim(), R.pickBy((val, key) => allowedDataObj[key] && allowedDataObj[key].writable, data))
}