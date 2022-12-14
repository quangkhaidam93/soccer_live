const envConfigs = require('./environment');

module.exports = {
  dev: {
    username: envConfigs.postgresUser,
    password: envConfigs.postgresPassword,
    database: envConfigs.postgresDatabase,
    host: 'db',
    dialect: "postgres",
  },
  prod: {
    username: envConfigs.postgresUser,
    password: envConfigs.postgresPassword,
    database: envConfigs.postgresDatabase,
    host: 'db',
    dialect: "postgres",
  },
};
