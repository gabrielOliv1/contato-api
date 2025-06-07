import { config } from 'dotenv';
import { resolve } from 'path';
import { sequelize } from '../config/database';
import { UserModel } from '../infrastructure/database/models/user.model';
import { ContactModel } from '../infrastructure/database/models/contact.model';
import { setupAssociations } from '../infrastructure/database/models/associations';

config({ path: resolve(__dirname, '../../.env.test') });

beforeAll(async () => {
  try {
    console.log('\n=== INICIALIZANDO SETUP DE TESTE ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database config:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    });

    console.log('\nTESTANDO CONEXÃO AO BANCO DE DADOS...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await ContactModel.drop();
    await UserModel.drop();
    await UserModel.sync({ force: true });
    await ContactModel.sync({ force: true });

    setupAssociations();

    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('\nTABELAS:', tables);
    console.log('=== SETUP DE TESTES FEITO COM SUCESSO ===\n');
  } catch (error) {
    console.error('\n=== FALHA SETUP DE TESTES ===');
    console.error('Error details:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    console.log('\n=== LIMPANDO SETUP DE TESTES ===');
    await sequelize.close();
    console.log('Database connection closed.');
    console.log('=== LIMPEZA FEITA ===\n');
  } catch (error) {
    console.error('Error during cleanup:', error);
    throw error;
  }
});

beforeEach(async () => {
  try {
    console.log('\n=== INICIALIZANDO 1 CASO DE TESTE ===');
    await ContactModel.destroy({ where: {}, force: true });
    await UserModel.destroy({ where: {}, force: true });
    console.log('Tables cleared successfully.');
    console.log('=== SETUP CASO DE TESTE FEIOTO ===\n');
  } catch (error) {
    console.error('Error during test case setup:', error);
    throw error;
  }
});

afterEach(async () => {
  console.log('\n=== CASO DE TESTE COMPLETO ===\n');
});



export const testUtils = {
  sequelize,
};
