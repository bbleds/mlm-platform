// list of constants that are used throughout the application
module.exports = {
    API_BASE_ENDPOINT : '/api/v1',
    API_LIST_DEFAULT_LENGTH : 25,
    // accessible user properties with property details - readable and writable properties define what you can access in post data or get params
    ACCESSIBLE_USER_PROPERTIES: {
        'first_name': {
            required : true,
            readable: true,
            writable : true
        }, 
        'last_name': {
            required : true,
            readable: true,
            writable : true
        }, 
        'email': {
            required : true,
            readable: true,
            writable : true
        },
         'bio': {
            required : false,
            readable: true,
            writable : true
         },
         'created_on' : {
            required : false,
            readable: true,
            writable : false
         },
         'updated_on' : {
            required : false,
            readable: true,
            writable : false
         },
    }, 
    ACCESSIBLE_BLOG_POST_PROPERTIES: {
        'title': {
            required : true,
            readable: true,
            writable : true
        }, 
        'content': {
            required : true,
            readable: true,
            writable : true
        }, 
        'user_id' : {
            required : false,
            readable: true,
            writable : true
        },
        'created_on' : {
            required : false,
            readable: true,
            writable : false
         },
         'updated_on' : {
            required : false,
            readable: true,
            writable : false
         },
    }, 
}