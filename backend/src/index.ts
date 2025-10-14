import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateJWT } from "./jwt/jwt";
import { handleCustomErrors } from "./errors/middleware";
import {
    getMonthData,
    getUserData,
    getYearData,
    postNewTransaction,
    getTransactionList,
    deleteTransaction,
    getTransaction,
    updateTransaction,
} from "./controllers/controllers";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "../swagger";
import path from "path";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 3000;

const publicDir = path.resolve(__dirname, "..", "public");

app.use(express.json());
app.use(cors());
app.use(express.static(publicDir));

const swaggerUiOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customJsStr:
        'document.title = "Income Calculator API"; const icons = document.querySelectorAll("link[rel=icon]"); icons.forEach((icon) => {document.head.removeChild(icon)}); const link = document.createElement("link"); link.rel = "icon"; link.type = "image/x-icon"; link.href="/favicon.ico"; document.head.appendChild(link);',
    customFavIcon: "/favicon.ico",
};

app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(openapiSpecification, swaggerUiOptions));

app.get("/api/schema", (request: Request, response: Response) => {
    response.setHeader("Content-Disposition", "attachment");
    response.setHeader("Content-Type", "application/json");
    response.send(openapiSpecification);
});

// Authenticate JWT for all requests below this point
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
 * /api/user:
 *  get:
 *      tags:
 *          -   Users
 *      summary: Retrieve the user's profile information
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad request
 */
app.get("/api/user", getUserData);

/**
 * @openapi
 * /api/transactions/{year}:
 *  get:
 *      tags:
 *          -   Transactions
 *      summary: Retrieve the transactions for a user in a given year
 *      parameters:
 *          -   in: path
 *              name: year
 *              schema:
 *                  type: integer
 *              required: true
 *              desciption: Number representing the year to retrieve the transactions for
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetTransactionYearResponse'
 *          400:
 *              description: Bad request
 */
app.get("/api/transactions/:year", getYearData);

/**
 * @openapi
 * /api/transactions/{year}/{month}:
 *  get:
 *      tags:
 *          -   Transactions
 *      summary: Retrieve the transactions for a user in a given month
 *      parameters:
 *          -   in: path
 *              name: year
 *              schema:
 *                  type: integer
 *              required: true
 *              desciption: Number representing the year to retrieve the transactions for
 *          -   in: path
 *              name: month
 *              schema:
 *                  type: string
 *                  enum: [january, february, march, april, may, june, july, august, september, october, november, december]
 *              required: true
 *              desciption: The month to retrieve the transactions for
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetTransactionMonthResponse'
 *          400:
 *              description: Bad request
 */
app.get("/api/transactions/:year/:month", getMonthData);

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
 *          400:
 *              description: Bad request
 */
app.post("/api/transactions", postNewTransaction);

/**
 * @openapi
 * /api/transactions:
 *  get:
 *      tags:
 *          -   Transactions
 *      summary: Retrieve all user transactions
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Transaction'
 *          400:
 *              description: Bad request
 */
app.get("/api/transactions", getTransactionList);

/**
 * @openapi
 * /api/transactions/{id}:
 *  get:
 *      tags:
 *          - Transactions
 *      summary: Get a single transaction
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *                  format: uuid
 *              required: true
 *              desciption: The ID of the transaction
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transaction'
 *          400:
 *              description: Bad request
 */
app.get("/api/transactions/:id", getTransaction);

/**
 * @openapi
 * /api/transactions/{id}:
 *  put:
 *      tags:
 *          - Transactions
 *      summary: Update a transaction
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *                  format: uuid
 *              required: true
 *              desciption: The ID of the transaction
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateTransactionInput'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transaction'
 *          400:
 *              description: Bad request
 */
app.put("/api/transactions/:id", updateTransaction);

/**
 * @openapi
 * /api/transactions/{id}:
 *  delete:
 *      tags:
 *          - Transactions
 *      summary: Delete a transaction
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *                  format: uuid
 *              required: true
 *              desciption: The ID of the transaction
 *      responses:
 *          204:
 *              description: Success
 *          400:
 *              description: Bad request
 */
app.delete("/api/transactions/:id", deleteTransaction);

// error-handling middleware
app.use(handleCustomErrors);

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
