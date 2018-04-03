const express = require('express')
const app = express()
const PORT = 4000


// ***** Basic api routes for admin usage

app.get('/api/pages', (req, res) => res.send({msg: 'This should provide a list editable pages'}))
app.get('/api/blog-posts', (req, res) => res.send({msg: 'This should provide a list of blog posts'}))
app.get('/api/team', (req, res) => res.send({msg: 'This should provide a list team members'}))
app.get('/api/users', (req, res) => res.send({msg: 'This should provide a list users'}))
app.get('/api/resources', (req, res) => res.send({msg: 'This should send back a list of resources'}))
app.get('/api/announcements', (req, res) => res.send({msg: 'This should show a list of announce ments'}))

app.get('*', (req, res) => res.send({msg: 'This is the default route'}))

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))


