import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface defining the decoded payload structure from JWT
// Interfaz que define la estructura del payload decodificado del JWT
export interface CustomRequestPayload {
    id: string;
    email: string;
    role: string;
    [key: string]: any;
}

export interface CustomRequest extends Request {
    user?: CustomRequestPayload;
}

// Middleware to verify JWT token sent in the Authorization header
// Middleware para verificar el token JWT enviado en el encabezado Authorization
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Access denied. No authentication token provided." });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        // JWT Verification: Verify payload using environment variable secret key exclusively
        // Verificación de JWT: Verifica el payload usando exclusivamente la clave secreta de las variables de entorno
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET environment variable is missing.");
        }
        const decoded = jwt.verify(token, secret) as CustomRequestPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
        return;
    }
};

// Middleware to restrict endpoint access based on user roles
// Middleware para restringir el acceso a endpoints según los roles de usuario
export const checkRole = (allowedRoles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated." });
            return;
        }

        const userRole = req.user.role || (req.user as any).rol;

        // Normalize role check to handle English and Spanish role names
        // Normalizar la comprobación de roles para soportar nombres en inglés y español
        const hasPermission = allowedRoles.some(role => {
            if (role === "Admin" || role === "Administrator" || role === "Administrador") {
                return userRole === "Admin" || userRole === "Administrator" || userRole === "Administrador";
            }
            if (role === "Request Manager" || role === "Gestor de Solicitudes") {
                return userRole === "Request Manager" || userRole === "Gestor de Solicitudes";
            }
            return userRole === role;
        });

        if (!hasPermission) {
            res.status(403).json({ message: "Access denied. You do not have permission to perform this action." });
            return;
        }

        next();
    };
};