import { Router } from "express";
import { getClinics, createClinic, updateClinic, deleteClinic } from "../controllers/clinic.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/clinics:
 *   get:
 *     summary: Listar todas las clínicas
 *     tags: [Clínicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clínicas registradas.
 *   post:
 *     summary: Crear nueva clínica (Solo Administrador)
 *     tags: [Clínicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Clínica creada.
 */
router.get("/", getClinics);
router.post("/", checkRole(["Administrador"]), createClinic);

/**
 * @swagger
 * /api/clinics/{id}:
 *   put:
 *     summary: Actualizar clínica
 *     tags: [Clínicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clínica actualizada.
 *   delete:
 *     summary: Eliminación lógica de clínica
 *     tags: [Clínicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clínica desactivada o eliminada lógicamente.
 */
router.put("/:id", checkRole(["Administrador"]), updateClinic);
router.delete("/:id", checkRole(["Administrador"]), deleteClinic);

export default router;