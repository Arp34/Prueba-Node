// Inventory junction model tracking stock quantities of medicines across warehouses
// Modelo pivote de Inventario para monitorear el stock de medicamentos por almacén
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import { Warehouse } from "./warehouse.js";
import { Medicine } from "./medicine.js";

export interface InventoryAttributes {
    id_almacen: string;
    id_medicamento: string;
    cantidad: number;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, "cantidad"> {}

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
    declare id_almacen: string;
    declare id_medicamento: string;
    declare cantidad: number;
}

Inventory.init(
    {
        id_almacen: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: Warehouse,
                key: "id_almacen"
            }
        },
        id_medicamento: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: Medicine,
                key: "id_medicamento"
            }
        },
        cantidad: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "inventarios",
        timestamps: false
    }
);