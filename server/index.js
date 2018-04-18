const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
const app = express()
const PORT = process.env.PORT || 4000
const knex = require('./db/knex')
const { COOKIE_KEY } = require('../config')
require('./services')(app, knex)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [COOKIE_KEY] // key used for encryption
  })
)

app.use(passport.initialize())
app.use(passport.session())

// ***** Basic api routes for admin usage
app.get('/api/pages', (req, res) => res.send({msg: 'This should provide a list editable pages'}))
app.get('/api/team', (req, res) => res.send({msg: 'This should provide a list team members'}))
app.get('/api/resources', (req, res) => res.send({msg: 'This should send back a list of resources'}))
app.get('/api/announcements', (req, res) => res.send({msg: 'This should show a list of announce ments'}))


require('./routes')(app, knex)

app.get('*', (req, res) => res.status(404).send({msg: 'This is the default route'}))

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))


