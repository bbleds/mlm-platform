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
    rawFilterQuery : (query = {}) => {
        // only allow the keys that are allowed to be accessed on users
        let arr = R.filter(i=> USER_ACCESSIBLE_GET_PARAMS.includes(i) , R.keys(query))
        return arr.reduce( (acc, val, index) => 
            {   
                return acc + 
                `${ index == arr.length-1 && arr.length > 1 ? "AND" : "" } 
                ( ${val}=${SqlString.escape(query[val])} or ${val} LIKE ${SqlString.escape('%'+query[val]+'%')} ) ` 
            },
            ``
        )
    }
}