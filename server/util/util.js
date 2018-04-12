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
    generateRawWhereQuery : (query = {}, allowedKeys = []) => {

        // filter out unallowed keys
        let arr = R.filter(i => allowedKeys.includes(i) , R.keys(query))

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
    generateOrderByStr : (query = {}, allowedKeys = []) => {
        
        return R.keys(query).includes('order_by') && allowedKeys.includes(query.order_by) ? 
                `${query.order_by} 
                    ${
                        query.dir && (query.dir.toUpperCase() == 'ASC' || query.dir.toUpperCase() == 'DESC') ? 
                        query.dir.toUpperCase() : 
                        'DESC'
                    }
                ` : 
                'created_on DESC'
    },
    // returns an array of key names of any key value pairs that are required but contain empty values.
    hasEmptyRequiredVals : (requiredKeys, data) => R.keys(R.pickBy((val, key) => requiredKeys.includes(key) && !val.trim(), data))
}