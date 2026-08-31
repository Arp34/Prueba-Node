// Basic Swagger configuration to document and test API endpoints
// Configuración básica de Swagger para documentar y probar endpoints de la API
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "RiwiMediCare Plus API",
            version: "1.0.0",
            description: "RESTful API for managing clinic inventory and medical supply requests"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    // Swagger scans JSDoc annotations in src/routes/
    // Swagger escanea las anotaciones JSDoc dentro de src/routes/
    apis: ["./src/routes/*.ts", "./src/routes/*.js"]
};

// Generate Swagger specifications / Genera las especificaciones de Swagger
export const swaggerSpec = swaggerJsdoc(options);