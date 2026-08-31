import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface MedicineAttributes {
    id_medicamento: string;
    codigo: string;
    nombre: string;
    descripcion?: string;
    precio: number;
    estado?: boolean;
}

export interface MedicineCreationAttributes extends Optional<MedicineAttributes, "id_medicamento" | "descripcion" | "estado"> {}

export class Medicine extends Model<MedicineAttributes, MedicineCreationAttributes> implements MedicineAttributes {
    declare id_medicamento: string;
    declare codigo: string;
    declare nombre: string;
    declare descripcion: string;
    declare precio: number;
    declare estado: boolean;
}

Medicine.init(
    {
        id_medicamento: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        codigo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "medicamentos",
        timestamps: false
    }
);