import { UserModel } from '../models/user.model';
import { sequelize } from '../../../config/database';

const mockUsers = [
  {
    name: 'Ana Souza',
    email: 'ana.souza@email.com',
    senha: '123456'
  },
  {
    name: 'João Pedro',
    email: 'joao.pedro@email.com',
    senha: '123456'
  },
  {
    name: 'Marina Silva',
    email: 'marina.silva@email.com',
    senha: '123456'
  },
  {
    name: 'Carlos Lima',
    email: 'carlos.lima@email.com',
    senha: '123456'
  },
  {
    name: 'Beatriz Melo',
    email: 'beatriz.melo@email.com',
    senha: '123456'
  }
];

async function seedUsers() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    await UserModel.sync({ force: true });
    console.log('Users table recreated.');

    await UserModel.bulkCreate(mockUsers);
    console.log('✔️ 5 users successfully inserted.');

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await sequelize.close();
  }
}

seedUsers(); 