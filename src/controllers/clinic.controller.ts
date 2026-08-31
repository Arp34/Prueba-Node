import { Request, Response } from "express";
import { Clinic } from "../models/clinic.js";

/**
 * Controller to create a new clinic. Includes unique NIT validation logic.
 * Controlador para crear una nueva clínica. Incluye lógica de validación de NIT único.
 */
export const createClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.body.name || req.body.nombre;
        const nit = req.body.nit;
        const address = req.body.address || req.body.direccion;
        const phone = req.body.phone || req.body.telefono;
        const manager = req.body.manager || req.body.responsable;

        if (!name || !nit || !address || !phone || !manager) {
            res.status(400).json({ message: "All fields (name, nit, address, phone, manager) are required." });
            return;
        }

        // Business Validation: Unique NIT validation to prevent duplicate clinic registrations
        // Validación de Negocio: Validación de NIT único para prevenir registros duplicados de clínicas
        const existingClinic = await Clinic.findOne({ where: { nit } });
        if (existingClinic) {
            res.status(400).json({ message: "A clinic with this NIT already exists." });
            return;
        }

        const clinic = await Clinic.create({
            nombre: name,
            nit,
            direccion: address,
            telefono: phone,
            responsable: manager
        });

        res.status(201).json({ message: "Clinic created successfully.", clinic });
    } catch (error) {
        console.error("Error creating clinic:", error);
        res.status(500).json({ message: "Internal error creating clinic." });
    }
};

/**
 * Controller to retrieve all active clinics.
 * Controlador para obtener todas las clínicas activas.
 */
export const getClinics = async (_req: Request, res: Response): Promise<void> => {
    try {
        const clinics = await Clinic.findAll({ where: { estado: true } });
        res.status(200).json(clinics);
    } catch (error) {
        console.error("Error retrieving clinics:", error);
        res.status(500).json({ message: "Error retrieving clinics." });
    }
};

/**
 * Controller to update an existing clinic by ID.
 * Controlador para actualizar una clínica existente por ID.
 */
export const updateClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const clinic = await Clinic.findByPk(id as string);

        if (!clinic || !clinic.estado) {
            res.status(404).json({ message: "Clinic not found or inactive." });
            return;
        }

        const updateData: any = {};
        if (req.body.name || req.body.nombre) updateData.nombre = req.body.name || req.body.nombre;
        if (req.body.nit) updateData.nit = req.body.nit;
        if (req.body.address || req.body.direccion) updateData.direccion = req.body.address || req.body.direccion;
        if (req.body.phone || req.body.telefono) updateData.telefono = req.body.phone || req.body.telefono;
        if (req.body.manager || req.body.responsable) updateData.responsable = req.body.manager || req.body.responsable;

        await clinic.update(updateData);
        res.status(200).json({ message: "Clinic updated successfully.", clinic });
    } catch (error) {
        console.error("Error updating clinic:", error);
        res.status(500).json({ message: "Error updating clinic." });
    }
};

/**
 * Controller to perform a soft delete on a clinic record.
 * Controlador para realizar el borrado lógico en un registro de clínica.
 */
export const deleteClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const clinic = await Clinic.findByPk(id as string);

        if (!clinic || !clinic.estado) {
            res.status(404).json({ message: "Clinic not found or already inactive." });
            return;
        }

        // Technical Comment: Soft Delete Logic - Disabling record by setting active status flag to false
        // Comentario Técnico: Lógica de Borrado Lógico - Desactiva el registro cambiando la bandera de estado activo a false
        await clinic.update({ estado: false });
        res.status(200).json({ message: "Clinic deactivated successfully (soft delete)." });
    } catch (error) {
        console.error("Error deactivating clinic:", error);
        res.status(500).json({ message: "Error deactivating clinic." });
    }
};