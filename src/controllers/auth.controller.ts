// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Controlador para la gestion de registro e inicio de sesion (login) utilizando JSON Web Tokens y bcrypt
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Funcion de login que valida las credenciales y genera el token de acceso
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Email y contraseña son requeridos."
            });
            return;
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({
                message: "Credenciales incorrectas."
            });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                message: "Credenciales incorrectas."
            });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET || "default_super_secret_key";
        const token = jwt.sign(
            { id: user.id, email: user.email },
            jwtSecret,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Inicio de sesión exitoso.",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            message: "Error al iniciar sesión."
        });
    }
};

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Si el registro de usuario requiere mas informacion (nombre, rol, etc.), agregarlo aqui y mapearlo al modelo User
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Email y contraseña son requeridos."
            });
            return;
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({
                message: "El correo electrónico ya está registrado."
            });
            return;
        }

        const newUser = await User.create({ email, password });

        res.status(201).json({
            message: "Usuario registrado con éxito.",
            user: {
                id: newUser.id,
                email: newUser.email
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
