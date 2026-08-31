import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { Clinic } from "../models/clinic.js";
import { Warehouse } from "../models/warehouse.js";
import { Medicine } from "../models/medicine.js";

export const seedDatabase = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "Debe subir un archivo JSON con la propiedad 'file'." });
            return;
        }

        const filePath = req.file.path;
        const rawData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(rawData);

        if (data.users && Array.isArray(data.users)) {
            const usersWithHashedPassword = await Promise.all(
                data.users.map(async (u: any) => {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(u.contrasena || u.password, salt);
                    return {
                        ...u,
                        contrasena: hashedPassword
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

        fs.unlinkSync(filePath);
        res.status(200).json({ message: "Base de datos poblada exitosamente mediante el Seeder JSON." });
    } catch (error) {
        console.error("Error al ejecutar Seeder:", error);
        res.status(500).json({ message: "Error interno al procesar la carga masiva JSON." });
    }
};