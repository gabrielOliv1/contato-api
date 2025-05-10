"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const createContact_service_1 = require("../../../application/services/createContact.service");
const listContactsByUserName_service_1 = require("../../../application/services/listContactsByUserName.service");
const contact_repository_impl_1 = require("../../../infrastructure/database/repositories/contact.repository.impl");
const router = (0, express_1.Router)();
const contactRepository = new contact_repository_impl_1.ContactRepository();
const createContactService = new createContact_service_1.CreateContactService(contactRepository);
const listContactsByUserNameService = new listContactsByUserName_service_1.ListContactsByUserNameService(contactRepository);
const contactController = new contact_controller_1.ContactController(createContactService, listContactsByUserNameService);
router.post('/contacts', contactController.create.bind(contactController));
router.get('/contacts', contactController.listByUserName.bind(contactController));
exports.default = router;
//# sourceMappingURL=contact.routes.js.map