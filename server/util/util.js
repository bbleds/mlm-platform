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
        let arr = R.keys(query)
        return arr.reduce( (acc, val, index) => 
            {   return acc + 
                `${ index == arr.length-1 && arr.length > 1 ? "AND" : "" } 
                ( ${val}="${query[val]}" or ${val} LIKE "%${query[val]}%" ) ` 
            },
            ``
        )
    }
}