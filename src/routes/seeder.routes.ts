import { Router } from "express";
import { seedDatabase } from "../controllers/seeder.controller.js";
import { uploadJson } from "../middlewares/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/seeders/seed:
 *   post:
 *     summary: Poblar la base de datos mediante un archivo JSON
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
 *                 description: Archivo data-seed.json
 *     responses:
 *       200:
 *         description: Base de datos poblada exitosamente.
 */
router.post("/seed", uploadJson.single("file"), seedDatabase);

export default router;