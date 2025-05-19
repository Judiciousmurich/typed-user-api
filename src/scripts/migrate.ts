import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [path.join(__dirname, '../src/models')],
});

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, '../src/migrations/*.ts'),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  try {
    await umzug.up();
    console.log('✅ Migrations completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed', err);
    process.exit(1);
  }
})();
