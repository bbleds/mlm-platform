
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'rowValue1', last_name: 'whatever'},
        {id: 2, first_name: 'rowValue2', last_name: 'something'},
      ])
    })
}
