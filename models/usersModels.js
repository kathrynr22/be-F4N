const knex = require('../db/connection');

exports.selectUsername = username => {
  return knex('users')
    .select(
      'users.username',
      'first_name',
      'last_name',
      'email',
      'avatar_url',
      'location',
      'bio',
      'amount_raised',
      'charities.charity_name',
      'charities.charity_logo',
      knex.raw('ARRAY_AGG (skill_name) skill_name')
    )
    .where('users.username', username)
    .join(
      'users_skills_junction',
      'users.username',
      '=',
      'users_skills_junction.username'
    )
    .join('skills', 'skills.skill_id', '=', 'users_skills_junction.skill_id')
    .join('charities', 'charities.charity_name', '=', 'users.charity_name')
    .groupBy('users.username', 'charities.charity_name')
    .then(user => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: 'username not found' });
      else {
        return user[0];
      }
    });
};

exports.insertUser = (
  username,
  first_name,
  last_name,
  email,
  avatar_url,
  location,
  bio,
  charity_name,
  skill_name
) => {
  if (
    !username ||
    !first_name ||
    !last_name ||
    !email ||
    // !avatar_url ||
    !location ||
    !bio ||
    !charity_name ||
    !skill_name
  ) {
    return Promise.reject({
      status: 400,
      msg: 'bad request',
    });
  }
  return knex('inserted_user')
    .with(
      'inserted_user',
      knex('users')
        .insert({
          username,
          first_name,
          last_name,
          email,
          avatar_url,
          location,
          bio,
          charity_name,
        })
        .returning('*')
    )
    .select(
      'inserted_user.username',
      'first_name',
      'last_name',
      'email',
      'avatar_url',
      'location',
      'bio',
      'charities.charity_name',
      'charities.charity_logo',
      'amount_raised'
    )
    .join(
      'charities',
      'inserted_user.charity_name',
      '=',
      'charities.charity_name'
    )
    .then(user => {
      const usernameSkillObj = skill_name.map(skill => {
        return {
          username,
          skill_id: knex('skills')
            .select('skill_id')
            .where({ skill_name: skill }),
        };
      });

      return knex('users_skills_junction')
        .insert(usernameSkillObj)
        .returning('*')
        .then(() => {
          return { ...user[0], skill_name };
        });
    });
};

exports.selectUsers = email => {
  return knex('users')
    .select(
      'users.username',
      'first_name',
      'last_name',
      'email',
      'avatar_url',
      'location',
      'bio',
      'amount_raised',
      'charities.charity_name',
      'charities.charity_logo',
      knex.raw('ARRAY_AGG (skill_name) skill_name')
    )
    .orderBy('username')
    .join(
      'users_skills_junction',
      'users.username',
      '=',
      'users_skills_junction.username'
    )
    .join('skills', 'skills.skill_id', '=', 'users_skills_junction.skill_id')
    .join('charities', 'charities.charity_name', '=', 'users.charity_name')
    .groupBy('users.username', 'charities.charity_name')
    .modify(query => {
      if (email) query.where({ email: email });
    })
    .then(users => {
      if (users.length === 0)
        return Promise.reject({ status: 404, msg: 'email not found' });
      else {
        return users;
      }
    });
};

exports.selectPatchedUsername = (username, avatar_url) => {
  return knex('users')
    .update({ avatar_url: avatar_url })
    .where({ 'users.username': username })
    .then(() => {
      return (
        knex('users')
          .select(
            'users.username',
            'first_name',
            'last_name',
            'email',
            'avatar_url',
            'location',
            'bio',
            'amount_raised',
            'charities.charity_name',
            'charities.charity_logo',
            knex.raw('ARRAY_AGG (skill_name) skill_name')
          )
          .where({ 'users.username': username })
          // .returning('*')
          .join(
            'users_skills_junction',
            'users.username',
            '=',
            'users_skills_junction.username'
          )
          .join(
            'skills',
            'skills.skill_id',
            '=',
            'users_skills_junction.skill_id'
          )
          .join(
            'charities',
            'charities.charity_name',
            '=',
            'users.charity_name'
          )
          .groupBy('users.username', 'charities.charity_name')
          .then(user => {
            if (user.length === 0)
              return Promise.reject({ status: 404, msg: 'username not found' });
            else {
              return user[0];
            }
          })
      );
    });
};

exports.selectNotifications = username => {
  return knex('notifications')
    .select('*')
    .where({ 'notifications.username': username })
    .then(notifications => {
      console.log(notifications);
      return notifications;
    });
  // .orderBy('skill_id')
  // .then(notifications => {
  //   if (notifications.length === 0)
  //     return Promise.reject({ status: 404, msg: 'no notifications found' });
  //   else {
  //     return notifications;
  //   }
  // })
};
