"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../config/database");
class ContactModel extends sequelize_1.Model {
}
exports.ContactModel = ContactModel;
ContactModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    telefone_celular: {
        type: sequelize_1.DataTypes.STRING(9),
        allowNull: false,
    },
    telefone_recado: {
        type: sequelize_1.DataTypes.STRING(9),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    endereco: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'contacts',
    timestamps: true,
});
//# sourceMappingURL=contact.model.js.map