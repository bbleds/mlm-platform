module.exports = (app, knex) => {
	require('./users')(app, knex)
	require('./blog_posts')(app, knex)
}