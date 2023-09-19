const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;

// const user = process.env.DB_USER_PROD;
// const password = process.env.DB_PASSWORD_PROD;
// const database = process.env.DB_NAME_PROD;
// const host = process.env.DB_HOST_PROD;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
});

module.exports = sequelize;