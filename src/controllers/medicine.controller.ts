import { Request, Response } from "express";
import { Medicine } from "../models/medicine.js";

/**
 * Controller to create a new medicine item.
 * Controlador para crear un nuevo medicamento.
 */
export const createMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const code = req.body.code || req.body.codigo;
        const name = req.body.name || req.body.nombre;
        const description = req.body.description || req.body.descripcion;
        const price = req.body.price !== undefined ? req.body.price : req.body.precio;

        if (!code || !name || price === undefined) {
            res.status(400).json({ message: "Code, name, and price are required." });
            return;
        }

        const existingMedicine = await Medicine.findOne({ where: { codigo: code } });
        if (existingMedicine) {
            res.status(400).json({ message: "A medicine with this code already exists." });
            return;
        }

        const medicine = await Medicine.create({
            codigo: code,
            nombre: name,
            descripcion: description,
            precio: price
        });

        res.status(201).json({ message: "Medicine created successfully.", medicine });
    } catch (error) {
        console.error("Error creating medicine:", error);
        res.status(500).json({ message: "Internal error creating medicine." });
    }
};

/**
 * Controller to retrieve all active medicine items.
 * Controlador para obtener todos los medicamentos activos.
 */
export const getMedicines = async (_req: Request, res: Response): Promise<void> => {
    try {
        const medicines = await Medicine.findAll({ where: { estado: true } });
        res.status(200).json(medicines);
    } catch (error) {
        console.error("Error retrieving medicines:", error);
        res.status(500).json({ message: "Error retrieving medicines." });
    }
};

/**
 * Controller to update medicine details.
 * Controlador para actualizar los detalles de un medicamento.
 */
export const updateMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id as string);

        if (!medicine || !medicine.estado) {
            res.status(404).json({ message: "Medicine not found or inactive." });
            return;
        }

        const updateData: any = {};
        if (req.body.code || req.body.codigo) updateData.codigo = req.body.code || req.body.codigo;
        if (req.body.name || req.body.nombre) updateData.nombre = req.body.name || req.body.nombre;
        if (req.body.description || req.body.descripcion) updateData.descripcion = req.body.description || req.body.descripcion;
        if (req.body.price !== undefined || req.body.precio !== undefined) {
            updateData.precio = req.body.price !== undefined ? req.body.price : req.body.precio;
        }

        await medicine.update(updateData);
        res.status(200).json({ message: "Medicine updated successfully.", medicine });
    } catch (error) {
        console.error("Error updating medicine:", error);
        res.status(500).json({ message: "Error updating medicine." });
    }
};

/**
 * Controller to perform soft delete on medicine item.
 * Controlador para realizar el borrado lógico de un medicamento.
 */
export const deleteMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id as string);

        if (!medicine || !medicine.estado) {
            res.status(404).json({ message: "Medicine not found or already inactive." });
            return;
        }

        // Technical Comment: Soft Delete Logic - Disabling record by setting active status flag to false
        // Comentario Técnico: Lógica de Borrado Lógico - Desactiva el registro cambiando la bandera de estado activo a false
        await medicine.update({ estado: false });
        res.status(200).json({ message: "Medicine deactivated successfully (soft delete)." });
    } catch (error) {
        console.error("Error deactivating medicine:", error);
        res.status(500).json({ message: "Error deactivating medicine." });
    }
};