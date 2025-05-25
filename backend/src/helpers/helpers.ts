import { Transaction } from "@prisma/client";
import {
    addDays,
    addWeeks,
    addMonths,
    isWeekend,
    subDays,
    differenceInCalendarDays,
    differenceInCalendarWeeks,
    differenceInCalendarMonths,
    type Day,
    nextDay,
    addBusinessDays,
    subBusinessDays,
} from "date-fns";
import { MonthDate, MonthSerializer } from "../types/types";
import { Decimal } from "@prisma/client/runtime/library";

// Function to add the ordinal suffix
export function getOrdinalSuffix(day: number): "th" | "st" | "nd" | "rd" {
    if (day > 3 && day < 21) return "th"; // Deal with teens (11th, 12th, 13th, etc.)
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

// Function to get transaction dates for the year and populate months
export const getTransactionDatesInYear = (transaction: Transaction, months: MonthSerializer[], year: number): void => {
    const { isExpense, recurrenceType, recurrenceRate, startDate, finishDate, amountInPence, isRecurring } = transaction as {
        isExpense: boolean;
        recurrenceType: "day" | "week" | "month";
        recurrenceRate: number;
        startDate?: Date;
        finishDate?: Date;
        amountInPence: Decimal;
        isRecurring: boolean;
    };

    if (isRecurring) {
        const firstDayOfYear: Date = new Date(year, 0);
        const lastDayOfYear = new Date(year, 11, 31);

        const start = startDate ?? firstDayOfYear;

        // Set the current year and initialize the starting date
        // @ts-ignore
        let currentDate: Date = startDate ? new Date(Math.max(firstDayOfYear, startDate)) : firstDayOfYear;

        // Limit the end date to the end of the year or finish date (if provided)
        // @ts-ignore
        const endDate: Date = finishDate ? new Date(Math.min(lastDayOfYear, finishDate)) : lastDayOfYear;

        const fnMap = {
            day: {
                difference: differenceInCalendarDays,
                add: addDays,
            },
            week: {
                difference: differenceInCalendarWeeks,
                add: addWeeks,
            },
            month: {
                difference: differenceInCalendarMonths,
                add: addMonths,
            },
        };

        if (start < firstDayOfYear) {
            // calculate the difference in recurrence type between start date and first day of year
            let difference: number = fnMap[recurrenceType].difference(firstDayOfYear, start);

            // add 1 recurrence type to current date until difference is a multiple of recurrence rate
            while (difference % recurrenceRate !== 0) {
                currentDate = fnMap[recurrenceType].add(currentDate, 1);
                difference++;
            }
        }

        while (currentDate <= endDate) {
            const monthIndex = currentDate.getMonth();
            isExpense ? (months[monthIndex].expenses += amountInPence.toNumber()) : (months[monthIndex].income += amountInPence.toNumber());
            currentDate = fnMap[recurrenceType].add(currentDate, recurrenceRate);
        }
    } else {
        const monthIndex = transaction.startDate?.getMonth();

        if (monthIndex !== undefined) {
            isExpense ? (months[monthIndex].expenses += amountInPence.toNumber()) : (months[monthIndex].income += amountInPence.toNumber());
        }
    }
};

export const getTransactionDatesInMonth = (transaction: Transaction, daysInMonth: MonthDate[], year: number, month: number): void => {
    const {
        recurrenceType,
        recurrenceRate,
        startDate,
        finishDate,
        specificDayOfWeek,
        specificDayOfMonth,
        firstLastDayOfMonth,
        isRecurring,
    } = transaction as {
        recurrenceType: "day" | "week" | "month";
        recurrenceRate: number;
        startDate?: Date;
        finishDate?: Date;
        specificDayOfWeek?: number;
        specificDayOfMonth?: number;
        firstLastDayOfMonth?: "first_business" | "last_business" | "last" | "specific";
        isRecurring: boolean;
    };

    if (isRecurring) {
        const firstDayOfMonth: Date = new Date(year, month);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const start = startDate ?? firstDayOfMonth;

        // Set the current year and initialize the starting date
        // @ts-ignore
        let currentDate: Date = startDate ? new Date(Math.max(firstDayOfMonth, startDate)) : firstDayOfMonth;

        // Limit the end date to the end of the month or finish date (if provided)
        // @ts-ignore
        const endDate: Date = finishDate ? new Date(Math.min(lastDayOfMonth, finishDate)) : lastDayOfMonth;

        const fnMap = {
            day: {
                difference: differenceInCalendarDays,
                add: addDays,
            },
            week: {
                difference: differenceInCalendarWeeks,
                add: addWeeks,
            },
            month: {
                difference: differenceInCalendarMonths,
                add: addMonths,
            },
        };

        if (start < firstDayOfMonth) {
            // calculate the difference in recurrence type between start date and first day of month
            let difference: number = fnMap[recurrenceType].difference(firstDayOfMonth, start);

            // add 1 recurrence type to current date until difference is a multiple of recurrence rate
            while (difference % recurrenceRate !== 0 && currentDate <= lastDayOfMonth) {
                currentDate = fnMap[recurrenceType].add(currentDate, 1);
                difference++;
            }
        }

        // Only add the transaction if it is in the month
        if (currentDate <= lastDayOfMonth) {
            // Set the day to the specific day of week, if it is not already
            if (recurrenceType === "week" && currentDate.getDay() !== specificDayOfWeek) {
                currentDate = nextDay(currentDate, specificDayOfWeek as Day);
            } else if (recurrenceType === "month") {
                if (firstLastDayOfMonth === "first_business" && isWeekend(currentDate)) {
                    currentDate = addBusinessDays(currentDate, 1);
                } else if (firstLastDayOfMonth === "last_business") {
                    currentDate = isWeekend(lastDayOfMonth) ? subBusinessDays(lastDayOfMonth, 1) : lastDayOfMonth;
                } else if (firstLastDayOfMonth === "last") {
                    currentDate = lastDayOfMonth;
                } else if (firstLastDayOfMonth === "specific") {
                    currentDate = new Date(year, month, specificDayOfMonth);
                }
            }

            while (currentDate <= endDate) {
                const dateIndex = currentDate.getDate() - 1;
                daysInMonth[dateIndex].transactions.push(transaction);
                currentDate = fnMap[recurrenceType].add(currentDate, recurrenceRate);
            }
        }
    } else {
        const dateIndex = transaction.startDate?.getDate();

        if (dateIndex !== undefined) {
            daysInMonth[dateIndex - 1].transactions.push(transaction);
        }
    }
};

export const groupTransactionsByMonth = (transactions: Transaction[], year: number): MonthSerializer[] => {
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

    transactions.forEach((transaction) => {
        getTransactionDatesInYear(transaction, months, year);
    });

    months.forEach((month) => {
        month.remaining = month.income - month.expenses;
    });

    return months;
};

export const groupTransactionsByDaysInMonth = (transactions: Transaction[], year: number, month: number): MonthDate[] => {
    const daysInMonth: MonthDate[] = [];

    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
        daysInMonth.push({ date: `${i}${getOrdinalSuffix(i)}`, transactions: [] });
    }

    transactions.forEach((transaction) => {
        getTransactionDatesInMonth(transaction, daysInMonth, year, month);
    });

    return daysInMonth;
};
