"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const contact_model_1 = require("../models/contact.model");
const user_model_1 = require("../models/user.model");
const sequelize_1 = require("sequelize");
class ContactRepository {
    async create(contact) {
        const contactData = { ...contact };
        const createdContact = await contact_model_1.ContactModel.create(contactData);
        return createdContact.toJSON();
    }
    async findByUserEmail(email) {
        const contact = await contact_model_1.ContactModel.findOne({
            where: { email },
        });
        return contact ? contact.toJSON() : null;
    }
    async findByUserName(userName) {
        const contacts = await contact_model_1.ContactModel.findAll({
            where: {
                '$user.name$': {
                    [sequelize_1.Op.like]: `%${userName}%`,
                },
            },
            include: [{
                    model: user_model_1.UserModel,
                    as: 'user',
                    attributes: ['name'],
                }],
        });
        return contacts.map(contact => contact.toJSON());
    }
}
exports.ContactRepository = ContactRepository;
//# sourceMappingURL=contact.repository.impl.js.map