"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_entity_1 = require("../../../domain/entities/contact.entity");
const class_validator_1 = require("class-validator");
class ContactController {
    constructor(createContactService, listContactsByUserNameService) {
        this.createContactService = createContactService;
        this.listContactsByUserNameService = listContactsByUserNameService;
    }
    async create(req, res) {
        try {
            const contact = new contact_entity_1.Contact();
            Object.assign(contact, req.body);
            const errors = await (0, class_validator_1.validate)(contact);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            const createdContact = await this.createContactService.execute(contact);
            return res.status(201).json(createdContact);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async listByUserName(req, res) {
        try {
            const { user_name } = req.query;
            if (!user_name || typeof user_name !== 'string') {
                return res.status(400).json({ message: 'User name is required' });
            }
            const contacts = await this.listContactsByUserNameService.execute(user_name);
            return res.json(contacts);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map