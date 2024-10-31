import { Sequelize } from 'sequelize';
import config from './config.js';
import dotenv from 'dotenv';

dotenv.config();


const environment = process.env.ENVIRONMENT || 'development';
const dbConfig = config[environment];


const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
