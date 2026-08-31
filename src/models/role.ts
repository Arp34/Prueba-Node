// Role entity model / Modelo de entidad Rol
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface RoleAttributes {
    id_rol: string;
    nombre: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, "id_rol"> {}

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    declare id_rol: string;
    declare nombre: string;
}

Role.init(
    {
        id_rol: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "roles",
        timestamps: false
    }
);