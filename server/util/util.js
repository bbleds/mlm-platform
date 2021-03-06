const R = require('ramda')
const SqlString = require('sqlstring')
const { API_LIST_DEFAULT_LENGTH } = require('../constants')

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

    // check that a record exists
    checkRecordExists : async (knex, table, id) => {
        let resp = {
            msg: `A record exists with id ${id}`,
            error: false
        }

        try{
            resp.data = await knex(table).select().where({id : parseInt(id)})
            if (!resp.data[0].id) {
                resp.msg = `A record with this id does not exist in ${table}`
                resp.error = true
            }
        }catch(e){
            resp.error = true
            resp.msg = e
        }

        return module.exports.standardRes([], resp.msg, resp.error)
    },

    // generate a limit for use in a query
    generateLimit : query => query.limit ? parseInt(query.limit) : API_LIST_DEFAULT_LENGTH,

    // generate an offset for use in a query
    generateOffset : query => query.page && parseInt(query.page)-1 >= 0  ? module.exports.generateLimit(query) * (parseInt(query.page)-1) : 0,

    // returns an array of key names of any key value pairs that are required but contain empty values.
    hasEmptyRequiredVals : (requiredKeys, data) => R.keys(R.pickBy((val, key) => requiredKeys.includes(key) && !val.trim(), data)),
    
    // filter out all unallowed keys in an object and trim each value
    filterAndTrimData : (allowedDataObj, data) => R.map( i => i.trim(), R.pickBy((val, key) => allowedDataObj[key] && allowedDataObj[key].writable, data))
}