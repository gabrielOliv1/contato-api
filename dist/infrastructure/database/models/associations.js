"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = setupAssociations;
const contact_model_1 = require("./contact.model");
const user_model_1 = require("./user.model");
function setupAssociations() {
    contact_model_1.ContactModel.belongsTo(user_model_1.UserModel, {
        foreignKey: 'id_usuario',
        as: 'user'
    });
    user_model_1.UserModel.hasMany(contact_model_1.ContactModel, {
        foreignKey: 'id_usuario',
        as: 'contacts'
    });
}
//# sourceMappingURL=associations.js.map