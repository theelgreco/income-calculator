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
// app.use(authenticateJWT);

app.get("/api/validateJWT", authenticateJWT, (request: Request, response: Response) => {
    response.send({ msg: "Hello There" });
});

app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get("/api/schema", (request: Request, response: Response) => {
    response.setHeader("Content-Disposition", "attachment");
    response.setHeader("Content-Type", "application/json");
    response.send(openapiSpecification);
});

app.use(authenticateJWT);

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
 */
app.get("/api/transactions/:year", getYearData);

app.post("/api/transactions", postNewTransaction);

// error-handling middleware
app.use(handleCustomErrors);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
