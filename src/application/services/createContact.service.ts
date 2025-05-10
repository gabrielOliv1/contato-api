import { Contact } from '../../domain/entities/contact.entity';
import { IContactRepository } from '../../domain/repositories/contact.repository';

export class CreateContactService {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(contactData: Contact): Promise<Contact> {
    const existingContact = await this.contactRepository.findByUserEmail(contactData.email);
    if (existingContact) {
      throw new Error('Email already registered');
    }

    return this.contactRepository.create(contactData);
  }
} 