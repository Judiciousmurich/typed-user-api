import express from 'express';
import { json } from 'body-parser';
import { sequelize } from './database'; // import the sequelize instance
import userRoutes from './routes/user.routes';

const app = express();
const PORT = 3000;

app.use(json());
app.use('/users', userRoutes);

// Test DB connection (no sync)
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });
