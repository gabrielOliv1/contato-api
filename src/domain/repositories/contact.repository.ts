import { Contact } from '../entities/contact.entity';

export interface IContactRepository {
  create(contact: Contact): Promise<Contact>;
  findByUserEmail(email: string): Promise<Contact | null>;
  findByUserName(userName: string): Promise<Contact[]>;
  delete(telefone_celular: string): Promise<void>;
  findByTelefoneCelular(telefone_celular: string): Promise<Contact | null>;
} 