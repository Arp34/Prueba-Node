import { Router } from "express";
import { createRequest, updateRequestStatus, getRequestsHistory } from "../controllers/request.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Crear una nueva solicitud de abastecimiento
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_clinica
 *               - id_almacen
 *               - id_medicamento
 *               - cantidad
 *             properties:
 *               id_clinica:
 *                 type: string
 *                 format: uuid
 *               id_almacen:
 *                 type: string
 *                 format: uuid
 *               id_medicamento:
 *                 type: string
 *                 format: uuid
 *               cantidad:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Solicitud registrada con éxito.
 *       400:
 *         description: Stock insuficiente o cantidad inválida.
 */
router.post("/", checkRole(["Administrador", "Gestor de Solicitudes"]), createRequest);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de una solicitud
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 example: Aprobada
 *     responses:
 *       200:
 *         description: Estado actualizado con éxito.
 */
router.patch("/:id/status", checkRole(["Administrador", "Gestor de Solicitudes"]), updateRequestStatus);

/**
 * @swagger
 * /api/requests/history:
 *   get:
 *     summary: Obtener el historial completo de solicitudes
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de solicitudes registradas.
 */
router.get("/history", getRequestsHistory);

/**
 * @swagger
 * /api/requests/history/clinic/{id_clinica}:
 *   get:
 *     summary: Obtener historial de solicitudes filtrado por clínica
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_clinica
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historial de la clínica consultada.
 */
router.get("/history/clinic/:id_clinica", getRequestsHistory);

export default router;