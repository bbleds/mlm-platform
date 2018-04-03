const R = require('ramda')

module.exports = (app, knex) => {
    // get all users
    app.get('/api/users', (req, res) => res.send({msg: 'This should provide a list users'}))
}