import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import { Clinic } from "./clinic.js";
import { Warehouse } from "./warehouse.js";
import { User } from "./user.js";

export interface RequestAttributes {
    id_solicitud: string;
    id_clinica: string;
    id_almacen: string;
    id_usuario: string;
    fecha_solicitud?: Date;
    estado?: string;
}

export interface RequestCreationAttributes extends Optional<RequestAttributes, "id_solicitud" | "fecha_solicitud" | "estado"> {}

export class RequestModel extends Model<RequestAttributes, RequestCreationAttributes> implements RequestAttributes {
    declare id_solicitud: string;
    declare id_clinica: string;
    declare id_almacen: string;
    declare id_usuario: string;
    declare fecha_solicitud: Date;
    declare estado: string;
}

RequestModel.init(
    {
        id_solicitud: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        id_clinica: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Clinic,
                key: "id_clinica"
            }
        },
        id_almacen: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Warehouse,
                key: "id_almacen"
            }
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id_usuario"
            }
        },
        fecha_solicitud: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        estado: {
            type: DataTypes.STRING(20),
            defaultValue: "Pendiente",
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "solicitudes",
        timestamps: false
    }
);