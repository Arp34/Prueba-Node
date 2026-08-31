import { Router } from "express";
import { createRequest, updateRequestStatus, getRequestsHistory } from "../controllers/request.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new supply request
 *     tags: [Requests]
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
 *         description: Request registered successfully.
 *       400:
 *         description: Insufficient stock or invalid quantity.
 */
router.post("/", checkRole(["Admin", "Administrator", "Administrador", "Request Manager", "Gestor de Solicitudes"]), createRequest);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   patch:
 *     summary: Update request status
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 example: Approved
 *     responses:
 *       200:
 *         description: Request status updated successfully.
 */
router.patch("/:id/status", checkRole(["Admin", "Administrator", "Administrador", "Request Manager", "Gestor de Solicitudes"]), updateRequestStatus);

/**
 * @swagger
 * /api/requests/history:
 *   get:
 *     summary: Retrieve complete request history
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of registered requests.
 */
router.get("/history", getRequestsHistory);

/**
 * @swagger
 * /api/requests/history/clinic/{id_clinica}:
 *   get:
 *     summary: Retrieve request history filtered by clinic
 *     tags: [Requests]
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
 *         description: Request history for specified clinic.
 */
router.get("/history/clinic/:id_clinica", getRequestsHistory);

export default router;