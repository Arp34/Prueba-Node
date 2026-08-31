import { Request, Response } from "express";
import { Warehouse } from "../models/warehouse.js";

/**
 * Controller to create a new warehouse.
 * Controlador para crear un nuevo almacén.
 */
export const createWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.body.name || req.body.nombre;
        const address = req.body.address || req.body.direccion;

        if (!name || !address) {
            res.status(400).json({ message: "Name and address are required." });
            return;
        }

        const warehouse = await Warehouse.create({
            nombre: name,
            direccion: address
        });

        res.status(201).json({ message: "Warehouse created successfully.", warehouse });
    } catch (error) {
        console.error("Error creating warehouse:", error);
        res.status(500).json({ message: "Internal error creating warehouse." });
    }
};

/**
 * Controller to retrieve all active warehouses.
 * Controlador para obtener todos los almacenes activos.
 */
export const getWarehouses = async (_req: Request, res: Response): Promise<void> => {
    try {
        const warehouses = await Warehouse.findAll({ where: { estado: true } });
        res.status(200).json(warehouses);
    } catch (error) {
        console.error("Error retrieving warehouses:", error);
        res.status(500).json({ message: "Error retrieving warehouses." });
    }
};

/**
 * Controller to update warehouse details.
 * Controlador para actualizar información de un almacén.
 */
export const updateWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findByPk(id as string);

        if (!warehouse || !warehouse.estado) {
            res.status(404).json({ message: "Warehouse not found or inactive." });
            return;
        }

        const updateData: any = {};
        if (req.body.name || req.body.nombre) updateData.nombre = req.body.name || req.body.nombre;
        if (req.body.address || req.body.direccion) updateData.direccion = req.body.address || req.body.direccion;

        await warehouse.update(updateData);
        res.status(200).json({ message: "Warehouse updated successfully.", warehouse });
    } catch (error) {
        console.error("Error updating warehouse:", error);
        res.status(500).json({ message: "Error updating warehouse." });
    }
};

/**
 * Controller to perform soft delete on warehouse.
 * Controlador para realizar el borrado lógico de un almacén.
 */
export const deleteWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findByPk(id as string);

        if (!warehouse || !warehouse.estado) {
            res.status(404).json({ message: "Warehouse not found or already inactive." });
            return;
        }

        // Soft Delete Logic - Disabling record by setting active status flag to false
        // Lógica de Borrado Lógico - Desactiva el registro cambiando la bandera de estado activo a false
        await warehouse.update({ estado: false });
        res.status(200).json({ message: "Warehouse deactivated successfully (soft delete)." });
    } catch (error) {
        console.error("Error deactivating warehouse:", error);
        res.status(500).json({ message: "Error deactivating warehouse." });
    }
};