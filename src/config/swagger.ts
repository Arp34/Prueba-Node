// Basic Swagger configuration to document and test API endpoints
// Configuración básica de Swagger para documentar y probar endpoints de la API
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RiwiMediCare Plus API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    // ---> AGREGA ESTA SECCIÓN DE COMPONENTES <---
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // ---------------------------------------------
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Ajusta según tus rutas
};

// Generate Swagger specifications / Genera las especificaciones de Swagger
export const swaggerSpec = swaggerJsdoc(options);