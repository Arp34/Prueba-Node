import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

// Función de Login adaptada al modelo en español
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            res.status(400).json({
                message: "Correo y contraseña son requeridos."
            });
            return;
        }

        const user = await User.findOne({ where: { correo } });
        if (!user || !user.estado) {
            res.status(401).json({
                message: "Credenciales incorrectas o usuario inactivo."
            });
            return;
        }

        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            res.status(401).json({
                message: "Credenciales incorrectas."
            });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET || "default_super_secret_key";
        const token = jwt.sign(
            { id: user.id_usuario, correo: user.correo, rol: user.rol },
            jwtSecret,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Inicio de sesión exitoso.",
            token,
            user: {
                id: user.id_usuario,
                nombre: user.nombre,
                correo: user.correo,
                rol: user.rol
            }
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            message: "Error al iniciar sesión."
        });
    }
};

// Función de Registro adaptada con Nombre, Correo, Contraseña y Rol
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, correo, contrasena, rol } = req.body;

        if (!nombre || !correo || !contrasena || !rol) {
            res.status(400).json({
                message: "Nombre, correo, contraseña y rol son requeridos."
            });
            return;
        }

        const existingUser = await User.findOne({ where: { correo } });
        if (existingUser) {
            res.status(409).json({
                message: "El correo electrónico ya está registrado."
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        const newUser = await User.create({ 
            nombre, 
            correo, 
            contrasena: hashedPassword, 
            rol 
        });

        res.status(201).json({
            message: "Usuario registrado con éxito.",
            user: {
                id: newUser.id_usuario,
                nombre: newUser.nombre,
                correo: newUser.correo,
                rol: newUser.rol
            }
        });

    } catch (error: any) {
        console.error("Error en registro:", error);

        if (error.name === "SequelizeValidationError") {
            const messages = error.errors.map((e: any) => e.message);
            res.status(400).json({ message: messages.join(", ") });
            return;
        }

        res.status(500).json({
            message: "Error al registrar el usuario."
        });
    }
};