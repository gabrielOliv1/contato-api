"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactService = void 0;
class CreateContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async execute(contactData) {
        const existingContact = await this.contactRepository.findByUserEmail(contactData.email);
        if (existingContact) {
            throw new Error('Email already registered');
        }
        return this.contactRepository.create(contactData);
    }
}
exports.CreateContactService = CreateContactService;
//# sourceMappingURL=createContact.service.js.map