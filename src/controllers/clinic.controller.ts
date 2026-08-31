import { Request, Response } from "express";
import { Clinic } from "../models/clinic.js";

export const createClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, nit, direccion, telefono, responsable } = req.body;

        if (!nombre || !nit || !direccion || !telefono || !responsable) {
            res.status(400).json({ message: "Todos los campos (nombre, nit, direccion, telefono, responsable) son obligatorios." });
            return;
        }

        const existingClinic = await Clinic.findOne({ where: { nit } });
        if (existingClinic) {
            res.status(400).json({ message: "Ya existe una clínica registrada con ese NIT." });
            return;
        }

        const clinic = await Clinic.create({ nombre, nit, direccion, telefono, responsable });
        res.status(201).json({ message: "Clínica creada con éxito.", clinic });
    } catch (error) {
        console.error("Error al crear clínica:", error);
        res.status(500).json({ message: "Error interno al crear la clínica." });
    }
};

export const getClinics = async (_req: Request, res: Response): Promise<void> => {
    try {
        const clinics = await Clinic.findAll({ where: { estado: true } });
        res.status(200).json(clinics);
    } catch (error) {
        console.error("Error al obtener clínicas:", error);
        res.status(500).json({ message: "Error al obtener las clínicas." });
    }
};

export const updateClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const clinic = await Clinic.findByPk(id as string);

        if (!clinic || !clinic.estado) {
            res.status(404).json({ message: "Clínica no encontrada o inactiva." });
            return;
        }

        await clinic.update(req.body);
        res.status(200).json({ message: "Clínica actualizada con éxito.", clinic });
    } catch (error) {
        console.error("Error al actualizar clínica:", error);
        res.status(500).json({ message: "Error al actualizar la clínica." });
    }
};

export const deleteClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const clinic = await Clinic.findByPk(id as string);

        if (!clinic || !clinic.estado) {
            res.status(404).json({ message: "Clínica no encontrada o ya inactiva." });
            return;
        }

        await clinic.update({ estado: false });
        res.status(200).json({ message: "Clínica desactivada correctamente (borrado lógico)." });
    } catch (error) {
        console.error("Error al desactivar clínica:", error);
        res.status(500).json({ message: "Error al eliminar la clínica." });
    }
};