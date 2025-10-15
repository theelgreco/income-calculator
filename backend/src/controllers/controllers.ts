import { NextFunction, Request, Response } from "express";
import {
    createNewTransaction,
    deleteSingleTransaction,
    getAllTransactions,
    getMonthTransactions,
    getSingleTransaction,
    getYearTransactions,
    updateSingleTransaction,
} from "../models/models";
import { validMonthStrings } from "../constants";
import { User } from "../../prisma/generated";

export function validateJWT(_request: Request, response: Response) {
    response.status(200).send({ msg: "Your JWT is valid" });
}

export async function getUserData(request: Request & { user?: any }, response: Response, next: NextFunction) {
    try {
        response.status(200).send(request.user);
    } catch (err: any) {
        next(err);
    }
}

export async function getYearData(
    request: Request & { user?: User; params: GetTransactionYearParams },
    response: Response,
    next: NextFunction
) {
    const slugRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (request.params?.year && slugRegex.test(request.params.year)) {
        next();
    } else {
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

export async function getTransactionList(request: Request & { user?: any }, response: Response, next: NextFunction) {
    try {
        const transactions = await getAllTransactions(request.user.id);
        response.status(200).send(transactions);
    } catch (err: any) {
        next(err);
    }
}

export async function getTransaction(request: Request & { user?: any }, response: Response, next: NextFunction) {
    try {
        if (!request.params.id) {
            throw new Error("No ID provided");
        }

        const transaction = await getSingleTransaction(request.params.id, request.user.id);

        if (transaction) {
            response.status(200).send(transaction);
        } else {
            response.status(404).send({ message: "Could not find that transaction" });
        }
    } catch (err: any) {
        next(err);
    }
}

export async function updateTransaction(request: Request & { user?: any }, response: Response, next: NextFunction) {
    try {
        if (!request.params.id) {
            throw new Error("No ID provided");
        }

        if (request.body.startDate) request.body.startDate = new Date(request.body.startDate);

        if (request.body.finishDate) request.body.finishDate = new Date(request.body.finishDate);

        const transaction = await updateSingleTransaction(request.body, request.params.id, request.user.id);

        return response.status(200).send(transaction);
    } catch (err: any) {
        next(err);
    }
}

export async function deleteTransaction(request: Request & { user?: any; params: { id: string } }, response: Response, next: NextFunction) {
    try {
        if (!request.params.id) {
            throw new Error("No ID provided");
        }

        await deleteSingleTransaction(request.params.id, request.user.id);

        response.status(204).end();
    } catch (err: any) {
        next(err);
    }
}
