import { Router } from "express";
import { seedDatabase } from "../controllers/seeder.controller.js";
import { uploadJson } from "../middlewares/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/seeders/seed:
 *   post:
 *     summary: Bulk seed database via uploaded JSON file
 *     tags: [Seeder]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: data-seed.json file
 *     responses:
 *       200:
 *         description: Database successfully seeded.
 */
router.post("/seed", uploadJson.single("file"), seedDatabase);

export default router;