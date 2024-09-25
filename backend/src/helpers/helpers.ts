import { Transaction } from "@prisma/client";
import { addDays, addWeeks, addMonths, isWeekend, subDays } from "date-fns";
import { MonthSerializer } from "../types/types";

// Function to get the first business day of the month
const getFirstBusinessDay = (date: Date) => {
    let firstDay = new Date(date.getFullYear(), date.getMonth());
    while (isWeekend(firstDay)) {
        firstDay = addDays(firstDay, 1); // Move forward until it's a business day
    }
    return firstDay;
};

// Function to get the last business day of the month
const getLastBusinessDayOfMonth = (date: Date) => {
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Last day of the month
    while (isWeekend(lastDay)) {
        lastDay = subDays(lastDay, 1); // Move back until it's a business day
    }
    return lastDay;
};

// Function to get transaction dates for the year and populate months
export const getTransactionDatesInYear = (transaction: Transaction, months: MonthSerializer[], year: number) => {
    const {
        isExpense,
        recurrenceType,
        recurrenceRate,
        startDate,
        finishDate,
        specificDayOfWeek,
        specificDayOfMonth,
        firstLastDayOfMonth,
        amountInPence,
    } = transaction;

    // Set the current year and initialize the starting date
    // @ts-ignore
    let currentDate: Date = startDate ? new Date(Math.max(new Date(`${year}-01-01`), startDate)) : new Date(`${year}-01-01`); // Start from Jan 1st or the transaction start date

    // Limit the end date to the end of the year or finish date (if provided)
    // @ts-ignore
    const endDate: Date = finishDate ? new Date(Math.min(new Date(`${year}-12-31`), finishDate)) : new Date(`${year}-12-31`);

    // Daily recurrence
    if (recurrenceType === "day" && recurrenceRate) {
        while (currentDate <= endDate) {
            const monthIndex = currentDate.getMonth();
            isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
            currentDate = addDays(currentDate, recurrenceRate);
        }
    }

    // Weekly recurrence
    else if (recurrenceType === "week" && recurrenceRate) {
        // Ensure the current date matches the desired day of the week
        while (currentDate.getDay() !== specificDayOfWeek) {
            currentDate = addDays(currentDate, 1);
        }
        while (currentDate <= endDate) {
            const monthIndex = currentDate.getMonth();
            isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
            currentDate = addWeeks(currentDate, recurrenceRate);
        }
    }

    // Monthly recurrence
    else if (recurrenceType === "month" && recurrenceRate) {
        while (currentDate <= endDate) {
            const monthIndex = currentDate.getMonth();
            if (firstLastDayOfMonth === "first_business") {
                const firstBusinessDay = getFirstBusinessDay(currentDate); // Get first day of the month
                isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
            } else if (firstLastDayOfMonth === "last_business") {
                const lastBusinessDay = getLastBusinessDayOfMonth(currentDate);
                isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
            } else if (firstLastDayOfMonth === "last") {
                const lastDay = new Date(currentDate.getFullYear(), monthIndex + 1, 0); // Get last day of the month
                isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
            } else if (specificDayOfMonth) {
                const dayInMonth = Math.min(specificDayOfMonth, new Date(currentDate.getFullYear(), monthIndex + 1, 0).getDate()); // Adjust if specific day exceeds month's days
                const date = new Date(currentDate.getFullYear(), monthIndex, dayInMonth);
                if (date <= endDate) {
                    isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
                }
            }
            currentDate = addMonths(currentDate, recurrenceRate);
        }
    }

    // Yearly recurrence
    else if (recurrenceType === "year" && recurrenceRate) {
        while (currentDate <= endDate) {
            const monthIndex = currentDate.getMonth();
            if (specificDayOfMonth) {
                const date = new Date(currentDate.getFullYear(), monthIndex, specificDayOfMonth);
                if (date <= endDate) {
                    isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
                }
            }
            currentDate.setFullYear(currentDate.getFullYear() + recurrenceRate);
        }
    }
};
