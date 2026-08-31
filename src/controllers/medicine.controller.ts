import { Request, Response } from "express";
import { Medicine } from "../models/medicine.js";

export const createMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { codigo, nombre, descripcion, precio } = req.body;

        if (!codigo || !nombre || precio === undefined) {
            res.status(400).json({ message: "Código, nombre y precio son requeridos." });
            return;
        }

        const existingMedicine = await Medicine.findOne({ where: { codigo } });
        if (existingMedicine) {
            res.status(400).json({ message: "Ya existe un medicamento registrado con ese código." });
            return;
        }

        const medicine = await Medicine.create({ codigo, nombre, descripcion, precio });
        res.status(201).json({ message: "Medicamento creado con éxito.", medicine });
    } catch (error) {
        console.error("Error al crear medicamento:", error);
        res.status(500).json({ message: "Error interno al crear el medicamento." });
    }
};

export const getMedicines = async (_req: Request, res: Response): Promise<void> => {
    try {
        const medicines = await Medicine.findAll({ where: { estado: true } });
        res.status(200).json(medicines);
    } catch (error) {
        console.error("Error al obtener medicamentos:", error);
        res.status(500).json({ message: "Error al obtener los medicamentos." });
    }
};

export const updateMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id as string);

        if (!medicine || !medicine.estado) {
            res.status(404).json({ message: "Medicamento no encontrado o inactivo." });
            return;
        }

        await medicine.update(req.body);
        res.status(200).json({ message: "Medicamento actualizado con éxito.", medicine });
    } catch (error) {
        console.error("Error al actualizar medicamento:", error);
        res.status(500).json({ message: "Error al actualizar el medicamento." });
    }
};

export const deleteMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id as string);

        if (!medicine || !medicine.estado) {
            res.status(404).json({ message: "Medicamento no encontrado o ya inactivo." });
            return;
        }

        await medicine.update({ estado: false });
        res.status(200).json({ message: "Medicamento desactivado correctamente (borrado lógico)." });
    } catch (error) {
        console.error("Error al desactivar medicamento:", error);
        res.status(500).json({ message: "Error al eliminar el medicamento." });
    }
};