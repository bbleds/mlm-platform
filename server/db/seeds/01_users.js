
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'ben', last_name: 'bledsoe', email: 'bbledsoe@example.com', bio : 'testing', permissions: 'admin'},
        {id: 2, first_name: 'dayrin', last_name: 'bledsoe', email: 'dbledsoe@example.com', bio: 'testing', permissions : 'user'},
        {id: 3, first_name: 'another', last_name: 'bledsoe', email: 'abledsoe@example.com', bio: 'testing', permissions : 'super_user'},
      ])
    })
}
