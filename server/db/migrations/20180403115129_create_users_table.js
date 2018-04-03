
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('users', (table) => {
        table.increments() // id - pk initializer
        table.string('first_name').notNullable
        table.string('last_name').notNullable
        table.timestamp('created_on').defaultTo(knex.fn.now())
        table.timestamp('updated_on').defaultTo(knex.fn.now())
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
