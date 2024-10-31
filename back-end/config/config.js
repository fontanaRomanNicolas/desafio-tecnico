import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    host: process.env.HOST_DB,
    dialect: 'mysql',
    port: process.env.PORT_DB,
  },
  test: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB_TEST,
    host: process.env.HOST_DB,
    dialect: 'mysql',
    port: process.env.PORT_DB,
  },
  production: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    host: process.env.HOST_DB,
    dialect: 'mysql',
    port: process.env.PORT_DB,
  },
};
