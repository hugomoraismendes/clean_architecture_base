import { Config, getConfig } from '.';

module.exports = async () => {
  let config: Config;
  config = await getConfig();

  const defaultDbAttributes = {
    timezone: '-03:00',
    define: {
      underscored: true
    },
    dialectOptions: {
      timezone: '-03:00',
      maxPreparedStatements: 0
    },
    migrationStorageTableName: 'sequelize_meta'
  };

  Object.keys(config.databases.mysql).forEach((key) => {
    Object.assign(config.databases.mysql[key], defaultDbAttributes);
  });

  return config.databases.mysql;
};
