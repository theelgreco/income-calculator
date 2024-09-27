import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import e from "cors";
import { authenticateJWT } from "./jwt/jwt";
import { handleCustomErrors } from "./errors/middleware";
import { getYearData, postNewTransaction } from "./controllers/controllers";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "../swagger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(e());

const swaggerUiOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customJsStr: 'document.title = "Income Calculator API"',
};

app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(openapiSpecification, swaggerUiOptions));

app.get("/api/schema", (request: Request, response: Response) => {
    response.setHeader("Content-Disposition", "attachment");
    response.setHeader("Content-Type", "application/json");
    response.send(openapiSpecification);
});

app.use(authenticateJWT);

/**
 * @openapi
 * /api/validateJWT:
 *  get:
 *      tags:
 *          -   Authentication
 *      summary: Validates the user's JSON Web Token
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  default: Your JWT is valid
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              UnauthorizedError:
 *                                  type: string
 *                                  default: No JWT provided
 */
app.get("/api/validateJWT", (request: Request, response: Response) => {
    response.status(200).send({ msg: "Your JWT is valid" });
});

/**
 * @openapi
 * /api/transactions/{year}:
 *  get:
 *      tags:
 *          -   Transactions
 *      parameters:
 *          -   in: path
 *              name: year
 *              schema:
 *                  type: integer
 *              required: true
 *              desciption: Number representing the year to retrieve the transactions for
 *      summary: Retrieve the transactions for a user in a given year
 *      responses:
 *          200:
 *              description: Returns the transactions for a user in a given year
 *          400:
 *              description: Bad request
 */
app.get("/api/transactions/:year", getYearData);

/**
 * @openapi
 * /api/transactions:
 *  post:
 *      tags:
 *          - Transactions
 *      summary: Create a new transaction
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateTransactionInput'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateTransactionResponse'
 *              400:
 *                  description: Bad request
 */
app.post("/api/transactions", postNewTransaction);

// error-handling middleware
app.use(handleCustomErrors);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
