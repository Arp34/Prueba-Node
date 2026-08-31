import { Router } from "express";
import { getWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from "../controllers/warehouse.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Listar todos los almacenes
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de almacenes.
 *   post:
 *     summary: Crear un nuevo almacén (Solo Administrador)
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Almacén registrado.
 */
router.get("/", getWarehouses);
router.post("/", checkRole(["Administrador"]), createWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Actualizar información de un almacén
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Almacén actualizado.
 *   delete:
 *     summary: Eliminación lógica de un almacén
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Almacén desactivado.
 */
router.put("/:id", checkRole(["Administrador"]), updateWarehouse);
router.delete("/:id", checkRole(["Administrador"]), deleteWarehouse);

export default router;