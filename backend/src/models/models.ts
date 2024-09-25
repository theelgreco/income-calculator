import { Transaction } from "@prisma/client";
import { prisma } from "../../prisma/connect";
import { MonthSerializer, NewTransactionData } from "../types/types";
import { getTransactionDatesInYear } from "../helpers/helpers";

export async function createUser(data: { user_id: string; email: string }) {
    try {
        const user = await prisma.user.create({ data: { id: data.user_id, email: data.email } });
        return user;
    } catch (err) {
        throw err;
    }
}

export async function getUser(authSlug: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id: authSlug } });
        return user;
    } catch (err: any) {
        throw err;
    }
}

// function groupTransactionsByMonth(transactions: Transaction[], year: number) {
//     const months = [
//         {
//             monthName: "January",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "February",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "March",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "April",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "May",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "June",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "July",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "August",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "September",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "October",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "November",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//         {
//             monthName: "December",
//             income: 0,
//             expenses: 0,
//             remaining: 0,
//         },
//     ];

//     transactions.forEach((transaction) => {
//         const { startTime, finishTime, frequency_interval_in_days } = transaction;

//         const startOfYear = new Date(year, 0);
//         const endOfYear = new Date(year, 12, 0);

//         const start = startTime < startOfYear ? startOfYear : startTime;
//         const finish = !finishTime || finishTime > endOfYear ? endOfYear : finishTime;

//         let currentDate = new Date(start);

//         if (startTime < startOfYear) {
//             const daysDifference = Math.floor((startOfYear.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24));
//             const skippedOccurrences = Math.floor(daysDifference / frequency_interval_in_days);
//             currentDate.setDate(startTime.getDate() + skippedOccurrences * frequency_interval_in_days);
//         }

//         while (currentDate <= finish) {
//             const month = currentDate.getMonth();

//             if (transaction.isExpense) {
//                 months[month].expenses += parseInt((transaction.amount_in_pence / 100).toFixed(2));
//             } else {
//                 months[month].income += parseInt((transaction.amount_in_pence / 100).toFixed(2));
//             }

//             months[month].remaining = months[month].income - months[month].expenses;

//             currentDate.setDate(currentDate.getDate() + frequency_interval_in_days);
//         }
//     });

//     return months;
// }

function groupTransactionsByMonth(transactions: Transaction[], year: number) {
    const months: MonthSerializer[] = [
        { monthName: "January", income: 0, expenses: 0, remaining: 0 },
        { monthName: "February", income: 0, expenses: 0, remaining: 0 },
        { monthName: "March", income: 0, expenses: 0, remaining: 0 },
        { monthName: "April", income: 0, expenses: 0, remaining: 0 },
        { monthName: "May", income: 0, expenses: 0, remaining: 0 },
        { monthName: "June", income: 0, expenses: 0, remaining: 0 },
        { monthName: "July", income: 0, expenses: 0, remaining: 0 },
        { monthName: "August", income: 0, expenses: 0, remaining: 0 },
        { monthName: "September", income: 0, expenses: 0, remaining: 0 },
        { monthName: "October", income: 0, expenses: 0, remaining: 0 },
        { monthName: "November", income: 0, expenses: 0, remaining: 0 },
        { monthName: "December", income: 0, expenses: 0, remaining: 0 },
    ];

    // for each transaction
    // calculate start date (first day of year if expense has no start date)
    // calculate end date (last day of year if expense has no finish date)
    // calculate first occurrence in the year
    // calculate month of first occurence
    // add first occurrence amount to relevant field of month in months array
    // add interval to date counter
    // add amount to current month of each occurrence

    transactions.forEach((transaction) => {
        getTransactionDatesInYear(transaction, months, year);
    });

    months.forEach((month) => {
        month.remaining = month.income - month.expenses;
    });

    return months;
}

export async function getYearTransactions(year: number, userId: string) {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                AND: [
                    { OR: [{ startDate: { lte: new Date(`${year}-12-31`) } }, { startDate: null }] },
                    { OR: [{ finishDate: { gte: new Date(`${year}-01-01`) } }, { finishDate: null }] },
                ],
            },
        });

        return groupTransactionsByMonth(transactions, year);
    } catch (err: any) {
        throw err;
    }
}

export async function createNewTransaction(data: Omit<Transaction, "id" | "createdAt">) {
    try {
        const transaction = await prisma.transaction.create({ data });
        return transaction;
    } catch (err: any) {
        throw err;
    }
}
