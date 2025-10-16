import { prisma } from "../../prisma/connect";
import { Transaction, User } from "../../prisma/generated";
import { groupTransactionsByDaysInMonth, groupTransactionsByMonth } from "../helpers/helpers";
import { MonthSerializer } from "../@types/types";

export async function createUser(data: { authId: string; username: string; email: string; image: string }): Promise<User> {
    try {
        return await prisma.user.create({ data });
    } catch (err) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getUser(authId: string): Promise<User | null> {
    try {
        return await prisma.user.findUnique({ where: { authId } });
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getYearTransactions(year: number, userId: string): Promise<MonthSerializer[]> {
    try {
        const s = performance.now();

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                AND: [
                    { OR: [{ startDate: { lte: new Date(`${year}-12-31`) } }, { startDate: null }] },
                    { OR: [{ finishDate: { gte: new Date(`${year}-1-01`) } }, { finishDate: null }] },
                ],
            },
        });

        const groupedTransactions = groupTransactionsByMonth(transactions, year);

        return groupedTransactions;
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getMonthTransactions(year: number, month: number, userId: string) {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                AND: [
                    { OR: [{ startDate: { lte: new Date(year, month + 1, 0) } }, { startDate: null }] },
                    { OR: [{ finishDate: { gte: new Date(year, month) } }, { finishDate: null }] },
                ],
            },
        });

        return groupTransactionsByDaysInMonth(transactions, year, month);
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function createNewTransaction(data: Omit<Transaction, "id" | "createdAt">) {
    try {
        const transaction = await prisma.transaction.create({ data });
        return transaction;
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getAllTransactions(userId: string): Promise<Transaction[]> {
    try {
        return await prisma.transaction.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getSingleTransaction(id: string, userId: string) {
    try {
        return await prisma.transaction.findUnique({ where: { id, userId } });
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function updateSingleTransaction(data: Omit<Transaction, "createdAt" | "userId">, id: string, userId: string) {
    try {
        return await prisma.transaction.update({ where: { id, userId }, data });
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function deleteSingleTransaction(id: string, userId: string) {
    try {
        await prisma.transaction.delete({
            where: {
                userId,
                id,
            },
        });
    } catch (err: any) {
        console.error(err);
    }
}
