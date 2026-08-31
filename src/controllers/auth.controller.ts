import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

/**
 * Controller handling user authentication (Login).
 * Validates user credentials and issues a JWT token.
 * 
 * Controlador para la autenticación de usuarios (Inicio de sesión).
 * Valida las credenciales del usuario y genera un token JWT.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email || req.body.correo;
        const password = req.body.password || req.body.contrasena;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        const user = await User.findOne({ where: { correo: email } });
        if (!user || !user.estado) {
            res.status(401).json({ message: "Invalid credentials or inactive user." });
            return;
        }

        // Compare plain text password with stored bcrypt hash
        // Compara la contraseña en texto plano con el hash guardado en bcrypt
        const isMatch = await bcrypt.compare(password, user.contrasena);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        // JWT Generation: Sign access token using process.env.JWT_SECRET exclusively
        // Generación de JWT: Firma el token de acceso usando exclusivamente process.env.JWT_SECRET
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({ message: "JWT_SECRET environment variable is missing." });
            return;
        }

        const token = jwt.sign(
            { id: user.id_usuario, email: user.correo, role: user.rol },
            jwtSecret,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id_usuario,
                name: user.nombre,
                email: user.correo,
                role: user.rol
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error logging in." });
    }
};

/**
 * Controller handling user registration.
 * Hashes user password with bcrypt before creating the record.
 * 
 * Controlador para el registro de usuarios.
 * Encripta la contraseña con bcrypt antes de crear el registro.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.body.name || req.body.nombre;
        const email = req.body.email || req.body.correo;
        const password = req.body.password || req.body.contrasena;
        const role = req.body.role || req.body.rol;

        if (!name || !email || !password || !role) {
            res.status(400).json({ message: "Name, email, password, and role are required." });
            return;
        }

        const existingUser = await User.findOne({ where: { correo: email } });
        if (existingUser) {
            res.status(409).json({ message: "Email is already registered." });
            return;
        }

        // Password Encryption: Generate salt and hash raw password with bcrypt
        // Encriptación de contraseña: Genera el salt y hashea la contraseña limpia con bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            nombre: name,
            correo: email,
            contrasena: hashedPassword,
            rol: role
        });

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser.id_usuario,
                name: newUser.nombre,
                email: newUser.correo,
                role: newUser.rol
            }
        });
    } catch (error: any) {
        console.error("Error during registration:", error);

        if (error.name === "SequelizeValidationError") {
            const messages = error.errors.map((e: any) => e.message);
            res.status(400).json({ message: messages.join(", ") });
            return;
        }

        res.status(500).json({ message: "Error registering user." });
    }
};