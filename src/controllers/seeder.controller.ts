import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { Clinic } from "../models/clinic.js";
import { Warehouse } from "../models/warehouse.js";
import { Medicine } from "../models/medicine.js";

/**
 * Controller to process bulk data seeding via uploaded JSON file.
 * Handles bcrypt password encryption and temporary file cleanup.
 * 
 * Controlador para procesar la siembra masiva de datos mediante un archivo JSON cargado.
 * Maneja la encriptación de contraseñas con bcrypt y la limpieza del archivo temporal.
 */
export const seedDatabase = async (req: Request, res: Response): Promise<void> => {
    let filePath: string | null = null;
    try {
        if (!req.file) {
            res.status(400).json({ message: "Must upload a JSON file under the 'file' key." });
            return;
        }

        // JSON File Processing via Multer - Reading uploaded JSON file from temp storage
        // Procesamiento de Archivo JSON mediante Multer - Lectura del archivo cargado en almacenamiento temporal
        filePath = req.file.path;
        const rawData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(rawData);

        if (data.users && Array.isArray(data.users)) {
            const usersWithHashedPassword = await Promise.all(
                data.users.map(async (u: any) => {
                    // Password Encryption: Hash passwords with bcrypt before bulk insertion
                    // Encriptación de contraseñas: Hashea contraseñas con bcrypt antes del bulk insert
                    const rawPassword = u.password || u.contrasena || "default123";
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(rawPassword, salt);

                    return {
                        nombre: u.name || u.nombre,
                        correo: u.email || u.correo,
                        contrasena: hashedPassword,
                        rol: u.role || u.rol || "Request Manager"
                    };
                })
            );
            await User.bulkCreate(usersWithHashedPassword, { ignoreDuplicates: true });
        }

        if (data.clinics && Array.isArray(data.clinics)) {
            await Clinic.bulkCreate(data.clinics, { ignoreDuplicates: true });
        }

        if (data.warehouses && Array.isArray(data.warehouses)) {
            await Warehouse.bulkCreate(data.warehouses, { ignoreDuplicates: true });
        }

        if (data.medicines && Array.isArray(data.medicines)) {
            await Medicine.bulkCreate(data.medicines, { ignoreDuplicates: true });
        }

        // Cleanup - Remove temporary file created by Multer after successful processing
        // Limpieza - Elimina el archivo temporal creado por Multer tras el procesamiento exitoso
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.status(200).json({ message: "Database successfully seeded via JSON Seeder." });
    } catch (error) {
        console.error("Error executing Seeder:", error);
        
        // Ensure temporary file is cleaned up even if error occurs
        // Asegura que el archivo temporal se elimine incluso si ocurre un error
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.status(500).json({ message: "Internal error processing bulk JSON seed." });
    }
};