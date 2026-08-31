// City entity model / Modelo de entidad Ciudad
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export interface CityAttributes {
    id_ciudad: string;
    nombre: string;
}

export interface CityCreationAttributes extends Optional<CityAttributes, "id_ciudad"> {}

export class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
    declare id_ciudad: string;
    declare nombre: string;
}

City.init(
    {
        id_ciudad: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "ciudades",
        timestamps: false
    }
);