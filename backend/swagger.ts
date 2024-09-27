import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";

const options: OAS3Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Income Calculator API",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/index.ts", "./src/controllers/controllers.ts", "./src/schema/*.ts"],
};

export const openapiSpecification = swaggerJSDoc(options);
