const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 4000
const knex = require('./db/knex')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// ***** Basic api routes for admin usage

app.get('/api/pages', (req, res) => res.send({msg: 'This should provide a list editable pages'}))
app.get('/api/team', (req, res) => res.send({msg: 'This should provide a list team members'}))
app.get('/api/resources', (req, res) => res.send({msg: 'This should send back a list of resources'}))
app.get('/api/announcements', (req, res) => res.send({msg: 'This should show a list of announce ments'}))


require('./routes')(app, knex)

app.get('*', (req, res) => res.send({msg: 'This is the default route'}))

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))


