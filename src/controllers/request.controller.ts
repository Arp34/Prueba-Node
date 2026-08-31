import { Request, Response } from "express";
import { RequestModel } from "../models/request.js";
import { RequestDetail } from "../models/requestDetail.js";
import { Inventory } from "../models/inventory.js";
import { Clinic } from "../models/clinic.js";
import { Medicine } from "../models/medicine.js";
import { sequelize } from "../config/database.js";

export const createRequest = async (req: Request, res: Response): Promise<void> => {
    const transaction = await sequelize.transaction();
    try {
        const { id_clinica, id_almacen, id_medicamento, cantidad } = req.body;
        const id_usuario = (req as any).user?.id || req.body.id_usuario;

        if (!cantidad || cantidad <= 0) {
            res.status(400).json({ message: "La cantidad solicitada debe ser mayor a cero." });
            return;
        }

        const clinic = await Clinic.findByPk(id_clinica);
        if (!clinic || !clinic.estado) {
            res.status(404).json({ message: "La clínica especificada no existe o está inactiva." });
            return;
        }

        const medicine = await Medicine.findByPk(id_medicamento);
        if (!medicine || !medicine.estado) {
            res.status(404).json({ message: "El medicamento especificado no existe o está inactivo." });
            return;
        }

        const inventoryItem = await Inventory.findOne({
            where: { id_almacen, id_medicamento }
        });

        if (!inventoryItem || inventoryItem.cantidad < cantidad) {
            res.status(400).json({ 
                message: `Inventario insuficiente. Stock disponible: ${inventoryItem ? inventoryItem.cantidad : 0}` 
            });
            return;
        }

        const newRequest = await RequestModel.create({
            id_clinica,
            id_almacen,
            id_usuario,
            estado: "Pendiente"
        }, { transaction });

        await RequestDetail.create({
            id_solicitud: newRequest.id_solicitud,
            id_medicamento,
            cantidad
        }, { transaction });

        await inventoryItem.update({
            cantidad: inventoryItem.cantidad - cantidad
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ message: "Solicitud registrada con éxito.", solicitud: newRequest });

    } catch (error) {
        await transaction.rollback();
        console.error("Error al crear la solicitud:", error);
        res.status(500).json({ message: "Error interno al procesar la solicitud." });
    }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const estadosPermitidos = ["Pendiente", "Aprobada", "Rechazada", "Entregada"];
        if (!estadosPermitidos.includes(estado)) {
            res.status(400).json({ message: `Estado no permitido. Estados válidos: ${estadosPermitidos.join(", ")}` });
            return;
        }

        const request = await RequestModel.findByPk(id as string);
        if (!request) {
            res.status(404).json({ message: "Solicitud no encontrada." });
            return;
        }

        await request.update({ estado });
        res.status(200).json({ message: "Estado de la solicitud actualizado con éxito.", solicitud: request });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el estado de la solicitud." });
    }
};

export const getRequestsHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_clinica } = req.params;
        const whereClause = id_clinica ? { id_clinica } : {};

        const requests = await RequestModel.findAll({
            where: whereClause,
            include: [
                { model: Clinic, attributes: ["id_clinica", "nombre", "nit"] },
                { model: Medicine, through: { attributes: ["cantidad"] } }
            ]
        });

        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el historial de solicitudes." });
    }
};