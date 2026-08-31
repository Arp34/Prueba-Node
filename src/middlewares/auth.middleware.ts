import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: {
        id: string;
        correo: string;
        rol: "Administrador" | "Gestor de Solicitudes";
    };
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Acceso denegado. No se proporcionó token de autenticación." });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET || "default_super_secret_key";
        const decoded = jwt.verify(token, secret) as any;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido o expirado." });
        return;
    }
};

export const checkRole = (rolesPermitidos: Array<"Administrador" | "Gestor de Solicitudes">) => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado." });
            return;
        }

        if (!rolesPermitidos.includes(req.user.rol)) {
            res.status(403).json({ message: "Acceso denegado. No tienes permisos para realizar esta acción." });
            return;
        }

        next();
    };
};