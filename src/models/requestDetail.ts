// RequestDetail model detailing requested items and quantities per order
// Modelo DetalleSolicitud con el detalle de items y cantidades solicitadas por pedido
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { RequestModel } from "./request.js";
import { Medicine } from "./medicine.js";

export interface RequestDetailAttributes {
    id_solicitud: string;
    id_medicamento: string;
    cantidad: number;
}

export class RequestDetail extends Model<RequestDetailAttributes, RequestDetailAttributes> implements RequestDetailAttributes {
    declare id_solicitud: string;
    declare id_medicamento: string;
    declare cantidad: number;
}

RequestDetail.init(
    {
        id_solicitud: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: RequestModel,
                key: "id_solicitud"
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
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "detalle_solicitudes",
        timestamps: false
    }
);