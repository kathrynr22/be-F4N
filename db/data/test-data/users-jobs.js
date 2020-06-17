// exports.up = knex => {
//   return knex.schema.createTable('users_job_junction', junctionTable => {
//     junctionTable.string('username').references('users.username');
//     junctionTable.integer('job_id').references('jobs.job_id');
//     junctionTable.string('helper_status');
//   });
// };

// exports.down = knex => {
//   return knex.schema.dropTable('users_job_junction');
// };

module.exports = [
  { username: 'twebleyf', job_id: 5 },
  { username: 'jhumbell', job_id: 3 },
  { username: 'cmarchbankj', job_id: 2 },

  { username: 'dfoxl', job_id: 4 },
  { username: 'hstrowan2m', job_id: 1 },
  { username: 'wstallebrass2r', job_id: 3 },

  { username: 'aduncklee32', job_id: 2 },
  { username: 'fsokale34', job_id: 5 },
];
