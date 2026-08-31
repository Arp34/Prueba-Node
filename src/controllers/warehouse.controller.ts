import { Request, Response } from "express";
import { Warehouse } from "../models/warehouse.js";

export const createWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, direccion } = req.body;
        if (!nombre || !direccion) {
            res.status(400).json({ message: "Nombre y dirección son requeridos." });
            return;
        }

        const warehouse = await Warehouse.create({ nombre, direccion });
        res.status(201).json({ message: "Almacén creado con éxito.", warehouse });
    } catch (error) {
        console.error("Error al crear almacén:", error);
        res.status(500).json({ message: "Error interno al crear el almacén." });
    }
};

export const getWarehouses = async (_req: Request, res: Response): Promise<void> => {
    try {
        const warehouses = await Warehouse.findAll({ where: { estado: true } });
        res.status(200).json(warehouses);
    } catch (error) {
        console.error("Error al obtener almacenes:", error);
        res.status(500).json({ message: "Error al obtener los almacenes." });
    }
};

export const updateWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findByPk(id as string);

        if (!warehouse || !warehouse.estado) {
            res.status(404).json({ message: "Almacén no encontrado o inactivo." });
            return;
        }

        await warehouse.update(req.body);
        res.status(200).json({ message: "Almacén actualizado con éxito.", warehouse });
    } catch (error) {
        console.error("Error al actualizar almacén:", error);
        res.status(500).json({ message: "Error al actualizar el almacén." });
    }
};

export const deleteWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findByPk(id as string);

        if (!warehouse || !warehouse.estado) {
            res.status(404).json({ message: "Almacén no encontrado o ya inactivo." });
            return;
        }

        await warehouse.update({ estado: false });
        res.status(200).json({ message: "Almacén desactivado correctamente (borrado lógico)." });
    } catch (error) {
        console.error("Error al desactivar almacén:", error);
        res.status(500).json({ message: "Error al eliminar el almacén." });
    }
};