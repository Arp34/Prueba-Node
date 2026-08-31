// Model associations mapping relationships between entities
// Asociaciones de modelos configurando las relaciones entre entidades
import { User } from "./user.js";
import { Clinic } from "./clinic.js";
import { Warehouse } from "./warehouse.js";
import { Medicine } from "./medicine.js";
import { Inventory } from "./inventory.js";
import { RequestModel } from "./request.js";
import { RequestDetail } from "./requestDetail.js";

export const setupAssociations = (): void => {
    // Request associations with Clinic, Warehouse, and User
    // Relaciones de Solicitud con Clínica, Almacén y Usuario
    Clinic.hasMany(RequestModel, { foreignKey: "id_clinica" });
    RequestModel.belongsTo(Clinic, { foreignKey: "id_clinica" });

    Warehouse.hasMany(RequestModel, { foreignKey: "id_almacen" });
    RequestModel.belongsTo(Warehouse, { foreignKey: "id_almacen" });

    User.hasMany(RequestModel, { foreignKey: "id_usuario" });
    RequestModel.belongsTo(User, { foreignKey: "id_usuario" });

    // Many-to-Many associations
    // Relaciones Muchos a Muchos (N:M)
    Warehouse.belongsToMany(Medicine, { through: Inventory, foreignKey: "id_almacen" });
    Medicine.belongsToMany(Warehouse, { through: Inventory, foreignKey: "id_medicamento" });

    RequestModel.belongsToMany(Medicine, { through: RequestDetail, foreignKey: "id_solicitud" });
    Medicine.belongsToMany(RequestModel, { through: RequestDetail, foreignKey: "id_medicamento" });
};