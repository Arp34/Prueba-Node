import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface WarehouseAttributes {
    id_almacen: string;
    nombre: string;
    direccion: string;
    estado?: boolean;
}

export interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, "id_almacen" | "estado"> {}

export class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
    declare id_almacen: string;
    declare nombre: string;
    declare direccion: string;
    declare estado: boolean;
}

Warehouse.init(
    {
        id_almacen: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "almacenes",
        timestamps: false
    }
);