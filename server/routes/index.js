module.exports = (app, knex) => {
	require('./auth')(app, knex)
	require('./users')(app, knex)
	require('./blog_posts')(app, knex)
}