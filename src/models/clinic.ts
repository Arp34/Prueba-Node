// Clinic entity model representing medical facilities receiving supply requests
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface ClinicAttributes {
    id_clinica: string;
    nombre: string;
    nit: string;
    direccion: string;
    telefono: string;
    responsable: string;
    estado?: boolean;
    deletedAt?: Date;
}

export interface ClinicCreationAttributes extends Optional<ClinicAttributes, "id_clinica" | "estado"> {}

export class Clinic extends Model<ClinicAttributes, ClinicCreationAttributes> implements ClinicAttributes {
    declare id_clinica: string;
    declare nombre: string;
    declare nit: string;
    declare direccion: string;
    declare telefono: string;
    declare responsable: string;
    declare estado: boolean;
    declare deletedAt?: Date;
}

Clinic.init(
    {
        id_clinica: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nit: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        direccion: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        responsable: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "clinicas",
        timestamps: true,  // Habilita createdAt y updatedAt
        paranoid: true     // Habilita el Soft Delete (crea la columna deletedAt automáticamente)
    }
);