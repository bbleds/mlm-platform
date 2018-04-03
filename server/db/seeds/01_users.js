
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'ben', last_name: 'bledsoe'},
        {id: 2, first_name: 'dayrin', last_name: 'bledsoe'},
      ])
    })
}
