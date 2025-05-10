import express from 'express';
import contactRoutes from './interfaces/http/routes/contact.routes';
import { sequelize } from './config/database';
import { setupAssociations } from './infrastructure/database/models/associations';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(contactRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    
    setupAssociations();
    await sequelize.sync();
    console.log('Database synchronized');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error while trying to star server:', error);
  }
}

startServer(); 