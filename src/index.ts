import express from "express";
import "dotenv/config";
import { sequelize } from "./config/database.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";


import "./models/user.js";
import "./models/clinic.js";
import "./models/warehouse.js";
import "./models/medicine.js";
import "./models/inventory.js";
import "./models/request.js";
import "./models/requestDetail.js";
import "./models/city.js";
import "./models/role.js";

import { setupAssociations } from "./models/associations.js";
import authRoutes from "./routes/auth.routes.js";
import seederRoutes from "./routes/seeder.routes.js";
import warehouseRoutes from "./routes/warehouse.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";
import requestRoutes from "./routes/request.routes.js";

const app = express();
app.use(express.json());

setupAssociations();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/seeders", seederRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/requests", requestRoutes);

app.get("/api", (_req, res) => {
    res.json({ message: "API RiwiMediCare Plus funcionando correctamente" });
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conexión con PostgreSQL exitosa");

        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados correctamente con PostgreSQL");

        const port = Number(process.env.PORT) || 3000;
        app.listen(port, () => {
            console.log(`Servidor en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error);
    }
}

startServer();