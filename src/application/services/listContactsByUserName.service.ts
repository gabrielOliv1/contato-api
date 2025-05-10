import { Contact } from '../../domain/entities/contact.entity';
import { IContactRepository } from '../../domain/repositories/contact.repository';

export class ListContactsByUserNameService {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(userName: string): Promise<Contact[]> {
    return this.contactRepository.findByUserName(userName);
  }
} 