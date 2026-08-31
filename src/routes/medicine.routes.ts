import { Router } from "express";
import { getMedicines, createMedicine, updateMedicine, deleteMedicine } from "../controllers/medicine.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Listar todos los medicamentos
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos.
 *   post:
 *     summary: Crear un nuevo medicamento (Solo Administrador)
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Medicamento creado.
 */
router.get("/", getMedicines);
router.post("/", checkRole(["Administrador"]), createMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   put:
 *     summary: Actualizar datos de un medicamento
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medicamento actualizado.
 *   delete:
 *     summary: Eliminación lógica de un medicamento
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medicamento inhabilitado.
 */
router.put("/:id", checkRole(["Administrador"]), updateMedicine);
router.delete("/:id", checkRole(["Administrador"]), deleteMedicine);

export default router;