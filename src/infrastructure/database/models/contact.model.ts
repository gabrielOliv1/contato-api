import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database';
import { UserModel } from './user.model';

export class ContactModel extends Model {
  public id!: number;
  public id_usuario!: number;
  public telefone_celular!: string;
  public telefone_recado?: string;
  public email!: string;
  public endereco!: string;
}

ContactModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id'
      }
    },
    telefone_celular: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    telefone_recado: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    endereco: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'contacts',
    timestamps: true,
  }
); 