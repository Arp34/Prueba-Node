// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Configuracion basica de Swagger para documentar y probar los endpoints de la API
import swaggerJsdoc from "swagger-jsdoc";

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Cambiar el titulo, descripcion o la URL del servidor local segun los requerimientos de la prueba
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Template",
            version: "1.0.0",
            description: "API base con Express, TypeScript, Sequelize y PostgreSQL"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/routes/*.ts", "./src/routes/*.js"]
};

export const swaggerSpec = swaggerJsdoc(options);