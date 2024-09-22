import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
import e from "cors";
import { authenticateJWT } from "./jwt/jwt";
import { handleCustomErrors } from "./errors/middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(e());
app.use(authenticateJWT);

app.get("/", (request: Request, response: Response) => {
    response.send({ msg: "Hello There" });
});

// error-handling middleware
app.use(handleCustomErrors);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
