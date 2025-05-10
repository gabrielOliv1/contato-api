import { Contact } from '../../../domain/entities/contact.entity';
import { IContactRepository } from '../../../domain/repositories/contact.repository';
import { ContactModel } from '../models/contact.model';
import { UserModel } from '../models/user.model';
import { Op } from 'sequelize';

export class ContactRepository implements IContactRepository {
  async create(contact: Contact): Promise<Contact> {
    const contactData = { ...contact };
    const createdContact = await ContactModel.create(contactData);
    return createdContact.toJSON() as Contact;
  }

  async findByUserEmail(email: string): Promise<Contact | null> {
    const contact = await ContactModel.findOne({
      where: { email },
    });
    return contact ? (contact.toJSON() as Contact) : null;
  }

  async findByUserName(userName: string): Promise<Contact[]> {
    const contacts = await ContactModel.findAll({
      include: [{
        model: UserModel,
        as: 'user',
        where: {
          name: {
            [Op.like]: `%${userName}%`
          }
        },
        attributes: ['name']
      }]
    });
    return contacts.map(contact => contact.toJSON() as Contact);
  }
} 