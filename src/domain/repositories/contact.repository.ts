import { Contact } from '../entities/contact.entity';

export interface IContactRepository {
  create(contact: Contact): Promise<Contact>;
  findByUserEmail(email: string): Promise<Contact | null>;
  findByUserName(userName: string): Promise<Contact[]>;
} 