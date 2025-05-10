import { Request, Response } from 'express';
import { CreateContactService } from '../../../application/services/createContact.service';
import { ListContactsByUserNameService } from '../../../application/services/listContactsByUserName.service';
import { Contact } from '../../../domain/entities/contact.entity';
import { validate } from 'class-validator';

export class ContactController {
  constructor(
    private readonly createContactService: CreateContactService,
    private readonly listContactsByUserNameService: ListContactsByUserNameService
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const contact = new Contact();
      Object.assign(contact, req.body);

      const errors = await validate(contact);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const createdContact = await this.createContactService.execute(contact);
      return res.status(201).json(createdContact);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async listByUserName(req: Request, res: Response): Promise<Response> {
    try {
      const { user_name } = req.query;
      
      if (!user_name || typeof user_name !== 'string') {
        return res.status(400).json({ message: 'User name is required' });
      }

      const contacts = await this.listContactsByUserNameService.execute(user_name);
      return res.json(contacts);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
} 