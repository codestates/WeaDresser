const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'weadresser',
    host: "18.233.8.82",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'weadresser',
    host: "18.233.8.82",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'weadresser',
    host: "18.233.8.82",
    dialect: "mysql",
  },
};
