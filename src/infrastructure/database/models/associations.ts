import { ContactModel } from './contact.model';
import { UserModel } from './user.model';

export function setupAssociations() {
  ContactModel.belongsTo(UserModel, {
    foreignKey: 'id_usuario',
    as: 'user'
  });

  UserModel.hasMany(ContactModel, {
    foreignKey: 'id_usuario',
    as: 'contacts'
  });
} 