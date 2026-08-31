import { Request, Response } from "express";
import { RequestModel } from "../models/request.js";
import { RequestDetail } from "../models/requestDetail.js";
import { Inventory } from "../models/inventory.js";
import { Clinic } from "../models/clinic.js";
import { Medicine } from "../models/medicine.js";
import { sequelize } from "../config/database.js";

/**
 * Controller to create supply request for a clinic.
 * Implements stock check and quantity <= 0 validation inside a database transaction.
 * 
 * Controlador para crear una solicitud de abastecimiento para una clínica.
 * Implementa la comprobación de stock y la validación de cantidad <= 0 dentro de una transacción.
 */
export const createRequest = async (req: Request, res: Response): Promise<void> => {
    const transaction = await sequelize.transaction();
    try {
        const clinicId = req.body.clinic_id || req.body.id_clinica;
        const warehouseId = req.body.warehouse_id || req.body.id_almacen;
        const medicineId = req.body.medicine_id || req.body.id_medicamento;
        const quantity = req.body.quantity !== undefined ? req.body.quantity : req.body.cantidad;
        const userId = (req as any).user?.id || req.body.user_id || req.body.id_usuario;

        // Business Validation: Rejecting request if quantity is less than or equal to zero
        // Validación de Negocio: Rechazo de solicitud si la cantidad es menor o igual a cero
        if (quantity === undefined || quantity <= 0) {
            res.status(400).json({ message: "The requested quantity must be greater than zero." });
            await transaction.rollback();
            return;
        }

        const clinic = await Clinic.findByPk(clinicId);
        if (!clinic || !clinic.estado) {
            res.status(404).json({ message: "The specified clinic does not exist or is inactive." });
            await transaction.rollback();
            return;
        }

        const medicine = await Medicine.findByPk(medicineId);
        if (!medicine || !medicine.estado) {
            res.status(404).json({ message: "The specified medicine does not exist or is inactive." });
            await transaction.rollback();
            return;
        }

        // Business Validation: Stock availability check prior to registering request
        // Validación de Negocio: Comprobación de stock disponible antes de registrar la solicitud
        const inventoryItem = await Inventory.findOne({
            where: { id_almacen: warehouseId, id_medicamento: medicineId }
        });

        if (!inventoryItem || inventoryItem.cantidad < quantity) {
            const availableStock = inventoryItem ? inventoryItem.cantidad : 0;
            res.status(400).json({
                message: `Insufficient inventory. Available stock: ${availableStock}`
            });
            await transaction.rollback();
            return;
        }

        // Create new supply request record / Crear nuevo registro de solicitud de abastecimiento
        const newRequest = await RequestModel.create({
            id_clinica: clinicId,
            id_almacen: warehouseId,
            id_usuario: userId,
            estado: "Pending"
        }, { transaction });

        // Register detail with quantity / Registrar detalle con la cantidad solicitada
        await RequestDetail.create({
            id_solicitud: newRequest.id_solicitud,
            id_medicamento: medicineId,
            cantidad: quantity
        }, { transaction });

        // Deduct inventory stock / Descontar la cantidad del inventario disponible
        await inventoryItem.update({
            cantidad: inventoryItem.cantidad - quantity
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ message: "Request registered successfully.", request: newRequest });

    } catch (error) {
        await transaction.rollback();
        console.error("Error creating supply request:", error);
        res.status(500).json({ message: "Internal error processing request." });
    }
};

/**
 * Controller to update request status (Pending, Approved, Rejected, Delivered).
 * Controlador para actualizar el estado de una solicitud (Pendiente, Aprobada, Rechazada, Entregada).
 */
export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const status = req.body.status || req.body.estado;

        const allowedStatuses = ["Pending", "Approved", "Rejected", "Delivered", "Pendiente", "Aprobada", "Rechazada", "Entregada"];
        if (!allowedStatuses.includes(status)) {
            res.status(400).json({
                message: `Invalid status. Allowed statuses: Pending, Approved, Rejected, Delivered`
            });
            return;
        }

        const request = await RequestModel.findByPk(id as string);
        if (!request) {
            res.status(404).json({ message: "Request not found." });
            return;
        }

        await request.update({ estado: status });
        res.status(200).json({ message: "Request status updated successfully.", request });

    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({ message: "Error updating request status." });
    }
};

/**
 * Controller to fetch request history globally or filtered by clinic.
 * Controlador para obtener el historial de solicitudes de forma global o filtrado por clínica.
 */
export const getRequestsHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const clinicId = req.params.id_clinica || req.params.clinic_id;
        const whereClause = clinicId ? { id_clinica: clinicId } : {};

        const requests = await RequestModel.findAll({
            where: whereClause,
            include: [
                { model: Clinic, attributes: ["id_clinica", "nombre", "nit"] },
                { model: Medicine, through: { attributes: ["cantidad"] } }
            ]
        });

        res.status(200).json(requests);
    } catch (error) {
        console.error("Error retrieving request history:", error);
        res.status(500).json({ message: "Error retrieving request history." });
    }
};