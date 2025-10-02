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
import path from "path";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 3000;

const publicDir = path.resolve(__dirname, "..", "public");

app.use(express.json());
app.use(cors());
app.use(express.static(publicDir));
app.use(authenticateJWT);

app.get("/api/validateJWT", (_request: Request, response: Response) => {
    response.status(200).send({ msg: "Your JWT is valid" });
});

app.get("/api/user", getUserData);

app.get("/api/transactions/:year", getYearData);

app.get("/api/transactions/:year/:month", getMonthData);

app.post("/api/transactions", postNewTransaction);

app.get("/api/transactions", getTransactionList);

app.get("/api/transactions/:id", getTransaction);

app.put("/api/transactions/:id", updateTransaction);

app.delete("/api/transactions/:id", deleteTransaction);

app.use(handleCustomErrors);

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
