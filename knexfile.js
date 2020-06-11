const { DB_URL, NODE_ENV = 'development' } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfig = {
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  development: {
    connection: {
      database: 'f4n',
    },
  },
  test: {
    connection: {
      database: 'f4n_test',
    },
  },
};

module.exports = { ...customConfig[NODE_ENV], ...baseConfig };
