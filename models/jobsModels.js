const knex = require('../db/connection');

exports.selectJobs = (sort_by, order, skill_name, location, username) => {
  if (order !== undefined && order !== 'asc' && order !== 'desc') {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }
  return knex('jobs')
    .select(
      'title',
      'jobs.body',
      'jobs.username',
      'jobs.job_id',
      'jobs.created_at',
      'jobs.job_status',
      'skill_name',
      'avatar_url',
      'jobs.location'
    )
    .join('skills', 'jobs.skill_id', '=', 'skills.skill_id')
    .join('users', 'jobs.username', '=', 'users.username')
    .leftJoin('comments', 'jobs.job_id', '=', 'comments.job_id')
    .count('comments.job_id AS comment_count')
    .groupBy(
      'jobs.job_id',
      'skills.skill_name',
      'users.avatar_url',
      'jobs.location'
    )
    .orderBy(sort_by || 'created_at', order || 'desc')
    .modify(query => {
      if (skill_name && location && username)
        query.where({
          skill_name,
          'jobs.location': location,
          'jobs.username': username,
        });
      else if (skill_name) query.where({ skill_name });
      else if (location) query.where({ 'jobs.location': location });
      else if (username) query.where({ 'jobs.username': username });
    })
    .then(jobs => {
      if (jobs.length === 0)
        return Promise.reject({ status: 404, msg: 'path not found' });
      else {
        return jobs;
      }
    });
};

exports.selectJob = job_id => {
  return knex('jobs')
    .select(
      'title',
      'jobs.body',
      'jobs.username',
      'jobs.job_id',
      'jobs.created_at',
      'jobs.job_status',
      'skill_name',
      'avatar_url',
      'jobs.location'
    )
    .join('skills', 'jobs.skill_id', '=', 'skills.skill_id')
    .join('users', 'jobs.username', '=', 'users.username')
    .leftJoin('comments', 'jobs.job_id', '=', 'comments.job_id')
    .count('comments.job_id AS comment_count')
    .groupBy(
      'jobs.job_id',
      'skills.skill_name',
      'users.avatar_url',
      'jobs.location'
    )
    .where({ 'jobs.job_id': job_id })
    .then(job => {
      if (job.length === 0)
        return Promise.reject({ status: 404, msg: 'job not found' });
      else {
        return job[0];
      }
    });
};

exports.insertJob = (
  username,
  title,
  body,
  skill_name,
  location,
  job_status = 'created'
) => {
  if (!username || !title || !body || !skill_name || !location) {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }

  return knex('inserted_job')
    .with(
      'inserted_job',
      knex('jobs')
        .insert({
          username,
          title,
          body,
          location,
          job_status,
          skill_id: knex('skills').select('skill_id').where({ skill_name }),
        })
        .returning('*')
    )
    .select(
      'inserted_job.title',
      'inserted_job.body',
      'inserted_job.username',
      'inserted_job.job_id',
      'inserted_job.created_at',
      'inserted_job.job_status',
      'skill_name',
      'avatar_url',
      'inserted_job.location'
    )
    .join('skills', 'inserted_job.skill_id', '=', 'skills.skill_id')
    .join('users', 'inserted_job.username', '=', 'users.username')
    .leftJoin('comments', 'inserted_job.job_id', '=', 'comments.job_id')
    .count('comments.job_id AS comment_count')
    .groupBy(
      'inserted_job.title',
      'inserted_job.body',
      'inserted_job.username',
      'inserted_job.job_id',
      'inserted_job.created_at',
      'inserted_job.job_status',
      'skills.skill_name',
      'users.avatar_url',
      'inserted_job.location'
    );
};

exports.deleteJob = job_id => {
  return knex('jobs')
    .del()
    .where({ job_id })
    .then(affectedRows => {
      return affectedRows === 0
        ? Promise.reject({ status: 404, msg: 'job not found' })
        : Promise.resolve();
    });
};

exports.selectCommentsByJobId = (
  job_id,
  sort_by,
  order,
  location,
  charity_name
) => {
  if (order !== undefined && order !== 'asc' && order !== 'desc') {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }
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
    .where('job_id', job_id)
    .orderBy(sort_by || 'created_at', order || 'desc')
    .modify(query => {
      if (charity_name && location)
        query.where({ 'charities.charity_name': charity_name, location });
      else if (charity_name)
        query.where({ 'charities.charity_name': charity_name });
      else if (location) query.where({ location });
    })
    .then(comments => {
      if (comments.length === 0) {
        return knex
          .select('*')
          .from('jobs')
          .where('job_id', job_id)
          .then(([job]) => {
            if (job === undefined) {
              return Promise.reject({
                status: 404,
                msg: 'job_id not found',
              });
            }
            return [];
          });
      }
      return comments;
    });
};

exports.insertComment = (job_id, body, username) => {
  if (!body || !username) {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }

  return knex('inserted_comment')
    .with(
      'inserted_comment',
      knex('comments')
        .insert({
          username: username,
          body: body,
          job_id: job_id,
        })
        .returning('*')
    )
    .select(
      'comment_id',
      'created_at',
      'users.username',
      'users.avatar_url',
      'body',
      'charities.charity_name',
      'charities.charity_logo',
      'location',
      'job_id'
    )
    .join('users', 'inserted_comment.username', '=', 'users.username')
    .join('charities', 'charities.charity_name', '=', 'users.charity_name')
    .where('job_id', job_id)
    .then(comment => {
      return comment[0];
    });
};
