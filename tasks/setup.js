const { execSync } = require('child_process');
const fs = require('fs');
const Sequelize = require('sequelize')

const copyConfig = () => {
  console.log('\x1b[33m%s\x1b[0m', 'Copying config...');
  const dbContent = fs.readFileSync('src/infra/config/git-ignored/databases.json', 'utf8');
  fs.writeFileSync('src/infra/config/databases.json', dbContent);

  const configContent = fs.readFileSync('src/infra/config/git-ignored/config.json', 'utf8');
  fs.writeFileSync('src/infra/config/config.json', configContent);
};

const compile = () => {
  console.log('\x1b[33m%s\x1b[0m', 'Compiling...');
  execSync('rm -rf dist/');
  execSync('tsc');
};

const createDB = async () => {
  const dbConfig = require('../src/infra/config/databases.json');

  console.log('\x1b[36m%s\x1b[0m', 'Creating database...');
  const conn = new Sequelize(null, dbConfig.username, dbConfig.password, {
    dialect: 'mysql',
    host: 'mysql-8.2'
  });
  await conn.query(
    `CREATE SCHEMA IF NOT EXISTS ${dbConfig.database} DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`
  );
  await conn.close();
};

(async () => {
  try {
    copyConfig();
    compile();
    await createDB();
    console.log('\x1b[5m%s\x1b[0m', 'Setup completed');
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', 'Project setup error');
    console.log(err);
  }
})();
