const knex = require('../db/connection');

exports.selectCharities = () => {
  return knex('charities').select('*').orderBy('charity_name');
};
