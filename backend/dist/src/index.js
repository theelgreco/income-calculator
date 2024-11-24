"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const jwt_1 = require("./jwt/jwt");
const middleware_1 = require("./errors/middleware");
const controllers_1 = require("./controllers/controllers");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../swagger");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const publicDir = path_1.default.resolve(__dirname, "..", "public");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(publicDir));
const swaggerUiOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customJsStr: 'document.title = "Income Calculator API"; const icons = document.querySelectorAll("link[rel=icon]"); icons.forEach((icon) => {document.head.removeChild(icon)}); const link = document.createElement("link"); link.rel = "icon"; link.type = "image/x-icon"; link.href="/favicon.ico"; document.head.appendChild(link);',
    customFavIcon: "/favicon.ico",
};
app.use("/api/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.openapiSpecification, swaggerUiOptions));
app.get("/api/schema", (request, response) => {
    response.setHeader("Content-Disposition", "attachment");
    response.setHeader("Content-Type", "application/json");
    response.send(swagger_1.openapiSpecification);
});
// Authenticate JWT for all requests below this point
app.use(jwt_1.authenticateJWT);
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
app.get("/api/validateJWT", (request, response) => {
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
app.get("/api/user", controllers_1.getUserData);
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
app.get("/api/transactions/:year", controllers_1.getYearData);
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
app.get("/api/transactions/:year/:month", controllers_1.getMonthData);
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
app.post("/api/transactions", controllers_1.postNewTransaction);
// error-handling middleware
app.use(middleware_1.handleCustomErrors);
app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
