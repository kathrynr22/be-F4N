const knex = require('../db/connection');

exports.selectCommentsByUsername = username => {
  return knex
    .select(
      'comment_id',
      'created_at',
      'users.username',
      'body',
      'charities.charity_name',
      'charities.charity_logo',
      'users.avatar_url',
      'location',
      'job_id'
    )
    .from('comments')
    .join('users', 'comments.username', '=', 'users.username')
    .join('charities', 'charities.charity_name', '=', 'users.charity_name')
    .where('users.username', username)
    .orderBy('created_at', 'desc')
    .then(comments => {
      if (username !== undefined && comments.length === 0)
        return Promise.reject({ status: 404, msg: 'username not found' });
      else {
        return comments;
      }
    });
};
