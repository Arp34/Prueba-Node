// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Punto de entrada principal de la aplicacion que inicializa Express, conecta la base de datos y monta los middlewares y rutas
import express from "express";
import "dotenv/config";
import { sequelize } from "./config/database.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import "./models/example.js";
import exampleRoutes from "./routes/example.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Registro de rutas y documentacion de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Registrar aqui las nuevas rutas de las entidades que se vayan agregando para la prueba tecnica
app.use("/api/examples", exampleRoutes);

app.get("/api", (_req, res) => {
    res.json({
        message: "API Template funcionando"
    });
});

// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Funcion para inicializar el servidor y conectar la base de datos
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conexión con PostgreSQL exitosa");

        // Sincronizacion automatica de modelos con la base de datos (utilizar alter: true para actualizar tablas en desarrollo)
        await sequelize.sync();
        console.log("Modelos sincronizados correctamente");

        app.listen(Number(process.env.PORT) || 3000, () => {
            console.log(
                `Servidor en http://localhost:${process.env.PORT || 3000}`
            );
        });
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error);
    }
}

startServer();