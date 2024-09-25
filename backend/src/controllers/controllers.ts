import { NextFunction, Request, Response } from "express";
import { createNewTransaction, getYearTransactions } from "../models/models";
import { NewTransactionData } from "../types/types";
import { Transaction } from "@prisma/client";

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

export async function postNewTransaction(request: Request, response: Response, next: NextFunction) {
    const customRequest = request as Request & { user?: any };

    let {
        name,
        isExpense,
        amountInPence,
        startDate,
        finishDate,
        isRecurring,
        recurrenceType,
        recurrenceRate,
        recurrenceRateType,
        specificDayOfWeek,
        specificDayOfMonth,
        firstLastDayOfMonth,
    } = request.body;

    if (startDate) startDate = new Date(startDate);

    if (finishDate) finishDate = new Date(finishDate);

    const data: Omit<Transaction, "id" | "createdAt"> = {
        userId: customRequest.user.id,
        name,
        isExpense,
        amountInPence,
        startDate,
        finishDate,
        isRecurring,
        recurrenceType,
        recurrenceRate,
        recurrenceRateType,
        specificDayOfWeek,
        specificDayOfMonth,
        firstLastDayOfMonth,
    };

    try {
        const transaction = await createNewTransaction(data);
        response.status(201).send(transaction);
    } catch (err: any) {
        next(err);
    }
}
