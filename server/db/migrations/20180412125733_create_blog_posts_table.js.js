
exports.up = (knex, Promise) => {
    return knex.schema
      .createTable('blog_posts', (table) => {
          table.increments() // id - pk initializer
          table.string('title').notNullable
          table.text('content','longtext').notNullable
          table.integer('user_id').unsigned()
          table.foreign('user_id').references('users.id')
          table.timestamp('created_on').defaultTo(knex.fn.now())
          table.timestamp('updated_on').defaultTo(knex.fn.now())
      })
  }
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('blog_posts')
  }
  
