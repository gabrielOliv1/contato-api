import request from 'supertest';
import express from 'express';
import { ContactController } from '../interfaces/http/controllers/contact.controller';
import { ListContactsByUserNameService } from '../application/services/listContactsByUserName.service';
import { CreateContactService } from '../application/services/createContact.service';
import { DeleteContactService } from '../application/services/deleteContact.service';
import { ContactRepository } from '../infrastructure/database/repositories/contact.repository';
import { UserModel } from '../infrastructure/database/models/user.model';
import { ContactModel } from '../infrastructure/database/models/contact.model';

describe('TESTES /contacts, ', () => {
  let app: express.Application;
  let contactRepository: ContactRepository;
  let createContactService: CreateContactService;
  let listContactsByUserNameService: ListContactsByUserNameService;
  let deleteContactService: DeleteContactService;
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

    console.log('\nCRIANDO CONTATO PARA CASO DE TESTE...');
    await ContactModel.create({
      id_usuario: testUser.id,
      telefone_celular: '123456789',
      email: 'contact1@example.com',
      endereco: 'Test Address 1'
    });

    await ContactModel.create({
      id_usuario: testUser.id,
      telefone_celular: '987654321',
      email: 'contact2@example.com',
      endereco: 'Test Address 2'
    });

    console.log('\nINICIALIZANDO APP DE TESTE...');
    app = express();
    app.use(express.json());

    contactRepository = new ContactRepository();
    createContactService = new CreateContactService(contactRepository);
    listContactsByUserNameService = new ListContactsByUserNameService(contactRepository);
    deleteContactService = new DeleteContactService(contactRepository);
    contactController = new ContactController(
      createContactService,
      listContactsByUserNameService,
      deleteContactService
    );

    console.log('Setting up routes...');
    app.get('/contacts', contactController.listByUserName.bind(contactController));
    app.post('/contacts', contactController.create.bind(contactController));
    app.delete('/contacts/:telefone_celular', contactController.delete.bind(contactController));
  });

  it('retorna os contatos quando user_name é fornecido', async () => {
    console.log('\n=== TESTANDO: retorna os contatos quando user_name é fornecido ===');
    console.log('Test case: GET /contacts?user_name=Test User');
    console.log('RESPOSTA ESPERADA:');
    console.log('- Status: 200');
    console.log('- RESPOSTA: Array com 2 contatos, com email, telefone_celular, endereço e indicando o usuário relacionado via id_usuario e "user"');

    const response = await request(app)
      .get('/contacts')
      .query({ user_name: 'Test User' });

    console.log('body da requisição /GET contacts: ', response.body)
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('telefone_celular');
    expect(response.body[0]).toHaveProperty('endereco');
  });

  it('deve retornar 404 quando user_name não existe', async () => {
    console.log('\n=== TESTANDO: retorna 404 quando user_name não existe ===');
    console.log('Test case: GET /contacts?user_name=UsuarioInexistente');
    console.log('RESPOSTA ESPERADA:');
    console.log('- Status: 404');
    console.log('- RESPOSTA: Mensagem de erro informativa com o user_name fornecido');

    const response = await request(app)
      .get('/contacts')
      .query({ user_name: 'UsuarioInexistente' });

    console.log('Status da requisição: ', response.status);
    console.log('Body da requisição: ', response.body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user_name', 'UsuarioInexistente');
    expect(response.body).toHaveProperty('contacts');
    expect(Array.isArray(response.body.contacts)).toBe(true);
    expect(response.body.contacts.length).toBe(0);
  });

  it('deve criar e depois deletar um contato', async () => {
    console.log('======= CRIAÇÃO DE CONTATO =======')
    const newContact = {
      id_usuario: testUser.id,
      telefone_celular: '999999999',
      telefone_recado: '999999998',
      email: 'EXEMPLO@test.com',
      endereco: 'Endereço novo para testar'
    }

    const createResponse = await request(app)
      .post('/contacts')
      .send(newContact)

    console.log('Status criação: ', createResponse.status)
    console.log('Body da requisição: ', createResponse.body)
    expect(createResponse.status).toBe(201)
    expect(createResponse.body).toMatchObject(newContact)

    // verificar se o contato foi criado no banco
    const createdContact = await contactRepository.findByTelefoneCelular(newContact.telefone_celular)
    console.log('Registro do contato no banco de dados: ', createdContact)
    expect(createdContact).not.toBeNull()
    expect(createdContact).toMatchObject(newContact)

    // deletar o contato
    const deleteResponse = await request(app)
      .delete(`/contacts/${newContact.telefone_celular}`)

    console.log('Status após chamada à rota de deleção /contacts/${newContact.telefone_celular}: ', deleteResponse.status)
    expect(deleteResponse.status).toBe(204)

    // verificar se o contato foi realmente deletado 
    const deletedContact = await contactRepository.findByTelefoneCelular(newContact.telefone_celular)
    console.log('Retorno da busca pelo contato deletado: ', deletedContact)
    expect(deletedContact).toBeNull()
  })

  it('deve retornar 404 ao tentar deletar contato inexistente', async () => {
    console.log('======= DELETAR CONTATO INEXISTENTE =======')
    const response = await request(app)
      .delete('/contacts/999999999')

    console.log('Status após deletar contato inexistente: ', response.status)
    expect(response.status).toBe(404)
  })
}); 