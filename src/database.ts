import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'user_api_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  models: [User],
});
