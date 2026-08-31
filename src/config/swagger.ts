// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Configuracion basica de Swagger para documentar y probar los endpoints de la API
import swaggerJsdoc from "swagger-jsdoc";

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Cambiar el titulo, descripcion o la URL del servidor local segun los requerimientos de la prueba
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "RiwiMediCare Plus API",
            version: "1.0.0",
            description: "API RESTful para la gestión de abastecimiento de clínicas e inventario médico"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    // Esto hace que Swagger busque las anotaciones JSDoc dentro de src/routes/
    apis: ["./src/routes/*.ts", "./src/routes/*.js"]
};
// Genera las especificaciones Swagger
export const swaggerSpec = swaggerJsdoc(options);