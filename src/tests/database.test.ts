import { UserModel } from '../infrastructure/database/models/user.model';
import { ContactModel } from '../infrastructure/database/models/contact.model';

describe('OPERAÇÕES DO BANCO DE DADOS', () => {
  it('deve criar e encontrar um usuário', async () => {
    const user = await UserModel.create({
      name: 'Test User',
      email: 'test@example.com',
      senha: 'password123'
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');

    const foundUser = await UserModel.findOne({
      where: { email: 'test@example.com' }
    });

    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toBe('Test User');
  });

  it('deve criar e cncontrar um contato', async () => {
    const user = await UserModel.create({
      name: 'Test User',
      email: 'test@example.com',
      senha: 'password123'
    });

    const contact = await ContactModel.create({
      id_usuario: user.id,
      telefone_celular: '123456789',
      email: 'contact@example.com',
      endereco: 'Test Address'
    });

    expect(contact).toBeDefined();
    expect(contact.telefone_celular).toBe('123456789');
    expect(contact.email).toBe('contact@example.com');

    const foundContact = await ContactModel.findOne({
      where: { email: 'contact@example.com' }
    });

    expect(foundContact).toBeDefined();
    expect(foundContact?.telefone_celular).toBe('123456789');
  });
}); 