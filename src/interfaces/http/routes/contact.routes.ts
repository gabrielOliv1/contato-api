import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { CreateContactService } from '../../../application/services/createContact.service';
import { ListContactsByUserNameService } from '../../../application/services/listContactsByUserName.service';
import { ContactRepository } from '../../../infrastructure/database/repositories/contact.repository.impl';

const router = Router();
const contactRepository = new ContactRepository();
const createContactService = new CreateContactService(contactRepository);
const listContactsByUserNameService = new ListContactsByUserNameService(contactRepository);
const contactController = new ContactController(createContactService, listContactsByUserNameService);

router.post('/contacts', contactController.create.bind(contactController));
router.get('/contacts', contactController.listByUserName.bind(contactController));

export default router; 