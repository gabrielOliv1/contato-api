import request from 'supertest';
import express from 'express';
import { ContactController } from '../interfaces/http/controllers/contact.controller';
import { ListContactsByUserNameService } from '../application/services/listContactsByUserName.service';
import { CreateContactService } from '../application/services/createContact.service';
import { ContactRepository } from '../infrastructure/database/repositories/contact.repository.impl';
import { UserModel } from '../infrastructure/database/models/user.model';
import { ContactModel } from '../infrastructure/database/models/contact.model';

describe('GET /contacts', () => {
  let app: express.Application;
  let contactRepository: ContactRepository;
  let createContactService: CreateContactService;
  let listContactsByUserNameService: ListContactsByUserNameService;
  let contactController: ContactController;
  let testUser: any;

  beforeEach(async () => {
    console.log('\n=== Setting up test environment ===');
    
    console.log('Creating test user...');
    testUser = await UserModel.create({
      name: 'Test User',
      email: 'test@example.com',
      senha: 'password123'
    });
    console.log('Test user created:', testUser.toJSON())

    console.log('\nCRIANDO CONTATO PARA CASO DE TESTE...');
    const contact1 = await ContactModel.create({
      id_usuario: testUser.id,
      telefone_celular: '123456789',
      email: 'contact1@example.com',
      endereco: 'Test Address 1'
    });
    console.log('Contact 1 created:', contact1.toJSON());

    const contact2 = await ContactModel.create({
      id_usuario: testUser.id,
      telefone_celular: '987654321',
      email: 'contact2@example.com',
      endereco: 'Test Address 2'
    });
    console.log('Contact 2 created:', contact2.toJSON());

    console.log('\nINICIALIZANDO APP DE TESTE...');
    app = express();
    app.use(express.json());

    console.log('Initializing dependencies...');
    contactRepository = new ContactRepository();
    createContactService = new CreateContactService(contactRepository);
    listContactsByUserNameService = new ListContactsByUserNameService(contactRepository);
    contactController = new ContactController(createContactService, listContactsByUserNameService);

    console.log('Setting up routes...');
    app.get('/contacts', contactController.listByUserName.bind(contactController));
    console.log('=== Test environment setup complete ===\n');
  });

  it('retorna os contatos quando user_name é fornecido', async () => {
    console.log('\n=== TESTANDO: retorna os contatos quando user_name é fornecido ===');
    console.log('Test case: GET /contacts?user_name=Test User');
    console.log('RESPOSTA ESPERADA:');
    console.log('- Status: 200');
    console.log('- RESPOSTA: Array com 2 contatos, com email, telefone_celula, endereço e indicando o usuário relacionado via id_usuario e "user"');

    const response = await request(app)
      .get('/contacts')
      .query({ user_name: 'Test User' });

    console.log('\nRESPOSTA RECEBIDA:');
    console.log('- Status:', response.status);
    console.log('- Body:', JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('telefone_celular');
    expect(response.body[0]).toHaveProperty('endereco');

    console.log('\nTest assertions passed successfully');
    console.log('=== Test completed ===\n');
  });
}); 