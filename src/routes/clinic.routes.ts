import { Router } from "express";
import { getClinics, createClinic, updateClinic, deleteClinic } from "../controllers/clinic.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/clinics:
 *   get:
 *     summary: Retrieve all active clinics
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active clinics.
 *   post:
 *     summary: Create a new clinic (Admin only)
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Clinic created successfully.
 */
router.get("/", getClinics);
router.post("/", checkRole(["Admin", "Administrator", "Administrador"]), createClinic);

/**
 * @swagger
 * /api/clinics/{id}:
 *   put:
 *     summary: Update clinic details (Admin only)
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clinic updated successfully.
 *   delete:
 *     summary: Soft delete a clinic (Admin only)
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clinic deactivated successfully.
 */
router.put("/:id", checkRole(["Admin", "Administrator", "Administrador"]), updateClinic);
router.delete("/:id", checkRole(["Admin", "Administrator", "Administrador"]), deleteClinic);

export default router;