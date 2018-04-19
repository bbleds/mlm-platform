
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('users', (table) => {
        table.increments() // id - pk initializer
        table.string('first_name').notNullable
        table.string('last_name').notNullable
        table.string('permissions').notNullable
        table.string('google_id').notNullable
        table.string('profile_img_url')
        table.string('raw_google_api_response')
        table.string('email')
        table.string('bio')
        table.boolean('approved')
        table.timestamp('created_on').defaultTo(knex.fn.now())
        table.timestamp('updated_on').defaultTo(knex.fn.now())
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
