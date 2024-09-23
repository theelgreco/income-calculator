import { NextFunction, Request, Response } from "express";
import { getYearTransactions } from "../models/models";

export function validateJWT(request: Request, response: Response) {
    response.status(200).send({ msg: "Your JWT is valid" });
}

export async function getYearData(request: Request, response: Response, next: NextFunction) {
    const customRequest = request as Request & { user?: any };
    const year = Number(customRequest.params?.year);
    const id = customRequest?.user.id;

    if (id && year && year.toString().length === 4) {
        try {
            const transactions = await getYearTransactions(year, id);
            response.status(200).send(transactions);
        } catch (err: any) {
            next(err);
        }
    }
}
