import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { CreateContactService } from '../../../application/services/createContact.service';
import { ListContactsByUserNameService } from '../../../application/services/listContactsByUserName.service';
import { DeleteContactService } from '../../../application/services/deleteContact.service';
import { ContactRepository } from '../../../infrastructure/database/repositories/contact.repository';

const router = Router();
const contactRepository = new ContactRepository();
const createContactService = new CreateContactService(contactRepository);
const listContactsByUserNameService = new ListContactsByUserNameService(contactRepository);
const deleteContactService = new DeleteContactService(contactRepository);
const contactController = new ContactController(
  createContactService,
  listContactsByUserNameService,
  deleteContactService
);

router.post('/contacts', contactController.create.bind(contactController));
router.get('/contacts', contactController.listByUserName.bind(contactController));
router.delete('/contacts/:telefone_celular', contactController.delete.bind(contactController));

export default router; 