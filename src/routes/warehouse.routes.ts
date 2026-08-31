import { Router } from "express";
import { getWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from "../controllers/warehouse.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Retrieve all active warehouses
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active warehouses.
 *   post:
 *     summary: Create a new warehouse (Admin only)
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Warehouse created successfully.
 */
router.get("/", getWarehouses);
router.post("/", checkRole(["Admin", "Administrator", "Administrador"]), createWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Update warehouse details (Admin only)
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Warehouse updated successfully.
 *   delete:
 *     summary: Soft delete a warehouse (Admin only)
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Warehouse deactivated successfully.
 */
router.put("/:id", checkRole(["Admin", "Administrator", "Administrador"]), updateWarehouse);
router.delete("/:id", checkRole(["Admin", "Administrator", "Administrador"]), deleteWarehouse);

export default router;