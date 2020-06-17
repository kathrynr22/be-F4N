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
  { username: 'twebleyf', job_id: 5, helper_status: 'interested' },
  { username: 'jhumbell', job_id: 3, helper_status: 'interested' },
  { username: 'cmarchbankj', job_id: 2, helper_status: 'interested' },
  { username: 'dfoxl', job_id: 4, helper_status: 'interested' },
  { username: 'hstrowan2m', job_id: 1, helper_status: 'interested' },
  { username: 'wstallebrass2r', job_id: 3, helper_status: 'interested' },
  { username: 'aduncklee32', job_id: 2, helper_status: 'interested' },
  { username: 'fsokale34', job_id: 5, helper_status: 'interested' },
];
