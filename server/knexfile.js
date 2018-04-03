const config = require('../config')

// db config settings
module.exports = {
    development: {
        client: 'mysql',
        connection: config.KNEX_MYSQL_CONNECTION,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
}