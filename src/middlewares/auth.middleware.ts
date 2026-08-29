// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Middleware de autenticacion para verificar la validez de los JSON Web Tokens (JWT) provistos en la cabecera Authorization
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface TokenPayload {
    id: string;
    email: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Acceso denegado. Token no proporcionado."
        });
        return;
    }

    try {
        const jwtSecret = process.env.JWT_SECRET || "default_super_secret_key";
        const decoded = jwt.verify(token, jwtSecret) as TokenPayload;

        // Adjuntar los datos decodificados al request
        req.user = decoded;
        next();

    } catch (error) {
        res.status(403).json({
            message: "Token inválido o expirado."
        });
    }
};
