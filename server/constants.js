// list of constants that are used throughout the application
module.exports = {
    API_BASE_ENDPOINT : '/api/v1',
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
    ACCESSIBLE_BLOG_POST_PROPERTIES: {
        'title': {
            required : true
        }, 
        'content': {
            required : true
        }, 
        'user_id' : {
            required : false
        }
    }, 
}