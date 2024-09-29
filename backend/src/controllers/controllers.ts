import { NextFunction, Request, Response } from "express";
import { createNewTransaction, getMonthTransactions, getUser, getYearTransactions } from "../models/models";
import { Transaction, User } from "@prisma/client";
import { GetTransactionMonthParams, GetTransactionYearParams } from "../schema/transaction.schema";
import { validMonthStrings } from "../constants";

export function validateJWT(request: Request, response: Response) {
    response.status(200).send({ msg: "Your JWT is valid" });
}

export async function getUserData(request: Request & { user?: any }, response: Response, next: NextFunction) {
    try {
        return await getUser(request.user.id);
    } catch (err: any) {
        next(err);
    }
}

export async function getYearData(
    request: Request & { user?: User; params: GetTransactionYearParams },
    response: Response,
    next: NextFunction
) {
    try {
        if (!request.user) {
            throw new Error("No user provided");
        }

        if (!request.params.year) {
            throw new Error("No year provided");
        } else if (request.params.year.length !== 4 || !parseInt(request.params.year)) {
            throw new Error("Invalid year provided");
        }

        const id = request.user.id;
        const year = Number(request.params.year);
        const transactions = await getYearTransactions(year, id);
        response.status(200).send(transactions);
    } catch (err: any) {
        next(err);
    }
}

export async function getMonthData(
    request: Request & { user?: User; params: GetTransactionMonthParams },
    response: Response,
    next: NextFunction
) {
    try {
        const monthIndex = validMonthStrings.findIndex((el) => el === request.params.month);

        if (!request.user) {
            throw new Error("No user provided");
        }

        if (!request.params.year) {
            throw new Error("No year provided");
        } else if (request.params.year.length !== 4 || !parseInt(request.params.year)) {
            throw new Error("Invalid year provided");
        }

        if (!request.params.month) {
            throw new Error("No month provided");
        } else if (monthIndex === -1) {
            throw new Error("Invalid month provided");
        }

        const id = request.user.id;
        const year = Number(request.params.year);
        const month = monthIndex;
        const transactions = await getMonthTransactions(year, month, id);
        response.status(200).send(transactions);
    } catch (err: any) {
        next(err);
    }
}

export async function postNewTransaction(request: Request & { user?: any }, response: Response, next: NextFunction) {
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
        userId: request.user.id,
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
