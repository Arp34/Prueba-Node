import { Router } from "express";
import { getMedicines, createMedicine, updateMedicine, deleteMedicine } from "../controllers/medicine.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Retrieve all active medicines
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active medicines.
 *   post:
 *     summary: Create a new medicine (Admin only)
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Medicine created successfully.
 */
router.get("/", getMedicines);
router.post("/", checkRole(["Admin", "Administrator", "Administrador"]), createMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   put:
 *     summary: Update medicine details (Admin only)
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medicine updated successfully.
 *   delete:
 *     summary: Soft delete a medicine (Admin only)
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medicine deactivated successfully.
 */
router.put("/:id", checkRole(["Admin", "Administrator", "Administrador"]), updateMedicine);
router.delete("/:id", checkRole(["Admin", "Administrator", "Administrador"]), deleteMedicine);

export default router;