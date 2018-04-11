// list of constants that are used throughout the application
module.exports = {
    // accessible user properties with property details
    ACCESSIBLE_USER_PROPERTIES: {
        'first_name': {
            required : true
        }, 
        'last_name': {
            required : true
        }, 
        'email': {
            required : true
        },
         'bio': {
            required : false
         }
    }, 
    API_BASE_ENDPOINT : '/api/v1'
}