// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Estructura basica de inicializacion de modelos en Sequelize con TypeScript
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Renombrar la clase, sus atributos, los tipos y las restricciones de la tabla segun la entidad requerida
export class Example extends Model {
    declare id: string;
    declare name: string;
}

Example.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "examples",
        timestamps: false
    }
);