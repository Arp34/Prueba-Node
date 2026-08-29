import { sequelize } from "../config/database.js";
import { User } from "../models/user.js";
import { Example } from "../models/example.js";

async function runSeed() {
    try {
        await sequelize.authenticate();
        console.log("Conexion establecida para ejecutar seeds.");

        // Crear usuario administrador inicial si no existe
        const existingAdmin = await User.findOne({ where: { email: "admin@example.com" } });
        if (!existingAdmin) {
            await User.create({
                email: "admin@example.com",
                password: "password123"
            });
            console.log("Seed: Usuario administrador inicial creado (admin@example.com / password123).");
        } else {
            console.log("Seed: El usuario administrador ya existe.");
        }

        // Crear registro de ejemplo inicial si no existe
        const existingExample = await Example.findOne({ where: { name: "Registro de prueba" } });
        if (!existingExample) {
            await Example.create({
                name: "Registro de prueba"
            });
            console.log("Seed: Registro de ejemplo creado.");
        } else {
            console.log("Seed: El registro de ejemplo ya existe.");
        }

        console.log("Seeding completado exitosamente.");
        process.exit(0);
    } catch (error) {
        console.error("Error al ejecutar los seeds:", error);
        process.exit(1);
    }
}

runSeed();
