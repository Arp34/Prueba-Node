// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Modelo de usuario con configuracion de encriptacion de contraseña automatica mediante hooks
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from "bcrypt";

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Si la prueba tecnica requiere campos adicionales para el usuario (como nombre, rol, etc.), agregarlos en las interfaces y en el init
export interface UserAttributes {
    id: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare email: string;
    declare password: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "El email ingresado no tiene un formato válido.",
                },
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    }
);
