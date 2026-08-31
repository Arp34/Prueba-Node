// User entity model for authentication and role management
// Modelo de entidad Usuario para autenticación y gestión de roles
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface UserAttributes {
    id_usuario: string;
    nombre: string;
    correo: string;
    contrasena: string;
    rol: "Admin" | "Administrator" | "Request Manager" | "Administrador" | "Gestor de Solicitudes";
    estado?: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id_usuario" | "estado"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id_usuario: string;
    declare nombre: string;
    declare correo: string;
    declare contrasena: string;
    declare rol: "Admin" | "Administrator" | "Request Manager" | "Administrador" | "Gestor de Solicitudes";
    declare estado: boolean;
}

User.init(
    {
        id_usuario: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        contrasena: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: false
    }
);