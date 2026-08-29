// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Definicion de rutas del sistema de autenticacion
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

// Endpoint para el inicio de sesion (login)
router.post("/login", login);

// Endpoint para el registro de nuevos usuarios
router.post("/register", register);

export default router;
