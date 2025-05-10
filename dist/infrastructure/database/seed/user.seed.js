"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const database_1 = require("../../../config/database");
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
        await database_1.sequelize.authenticate();
        console.log('Database connection established.');
        const existingUsers = await user_model_1.UserModel.findAll({
            where: {
                email: mockUsers.map(user => user.email)
            }
        });
        if (existingUsers.length > 0) {
            console.log('ℹ️ Users already exist. Skipping insert.');
            return;
        }
        await user_model_1.UserModel.bulkCreate(mockUsers);
        console.log('✔️ 5 users successfully inserted.');
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
    finally {
        await database_1.sequelize.close();
    }
}
seedUsers();
//# sourceMappingURL=user.seed.js.map