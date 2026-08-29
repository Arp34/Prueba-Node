// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Declaracion y configuracion del Router de Express para la entidad Example
import { Router } from "express";
import { createExample, deleteExample, getExampleById, getExamples, updateExample } from "../controllers/example.controller.js";

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Modificar o agregar rutas, mapear nuevos controladores o inyectar middlewares de autenticacion (authenticateToken) segun la entidad requerida
const router = Router();

router.post("/", createExample);
router.get("/", getExamples);
router.get("/:id", getExampleById);
router.put("/:id", updateExample);
router.delete("/:id", deleteExample);

export default router;