"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupTransactionsByDaysInMonth = exports.groupTransactionsByMonth = exports.getTransactionDatesInMonth = exports.getTransactionDatesInYear = void 0;
exports.getOrdinalSuffix = getOrdinalSuffix;
const date_fns_1 = require("date-fns");
// Function to add the ordinal suffix
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21)
        return "th"; // Deal with teens (11th, 12th, 13th, etc.)
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
const getTransactionDatesInYear = (transaction, months, year) => {
    const { isExpense, recurrenceType, recurrenceRate, startDate, finishDate, amountInPence } = transaction;
    const firstDayOfYear = new Date(year, 0);
    const lastDayOfYear = new Date(year, 11);
    const start = startDate !== null && startDate !== void 0 ? startDate : firstDayOfYear;
    // Set the current year and initialize the starting date
    // @ts-ignore
    let currentDate = startDate ? new Date(Math.max(firstDayOfYear, startDate)) : firstDayOfYear;
    // Limit the end date to the end of the year or finish date (if provided)
    // @ts-ignore
    const endDate = finishDate ? new Date(Math.min(lastDayOfYear, finishDate)) : lastDayOfYear;
    const fnMap = {
        day: {
            difference: date_fns_1.differenceInCalendarDays,
            add: date_fns_1.addDays,
        },
        week: {
            difference: date_fns_1.differenceInCalendarWeeks,
            add: date_fns_1.addWeeks,
        },
        month: {
            difference: date_fns_1.differenceInCalendarMonths,
            add: date_fns_1.addMonths,
        },
    };
    if (start < firstDayOfYear) {
        // calculate the difference in recurrence type between start date and first day of year
        let difference = fnMap[recurrenceType].difference(firstDayOfYear, start);
        // add 1 recurrence type to current date until difference is a multiple of recurrence rate
        while (difference % recurrenceRate !== 0) {
            currentDate = fnMap[recurrenceType].add(currentDate, 1);
            difference++;
        }
    }
    while (currentDate <= endDate) {
        const monthIndex = currentDate.getMonth();
        isExpense ? (months[monthIndex].expenses += amountInPence) : (months[monthIndex].income += amountInPence);
        currentDate = fnMap[recurrenceType].add(currentDate, recurrenceRate);
    }
};
exports.getTransactionDatesInYear = getTransactionDatesInYear;
const getTransactionDatesInMonth = (transaction, daysInMonth, year, month) => {
    const { recurrenceType, recurrenceRate, startDate, finishDate, specificDayOfWeek, specificDayOfMonth, firstLastDayOfMonth } = transaction;
    const firstDayOfMonth = new Date(year, month);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const start = startDate !== null && startDate !== void 0 ? startDate : firstDayOfMonth;
    // Set the current year and initialize the starting date
    // @ts-ignore
    let currentDate = startDate ? new Date(Math.max(firstDayOfMonth, startDate)) : firstDayOfMonth;
    // Limit the end date to the end of the month or finish date (if provided)
    // @ts-ignore
    const endDate = finishDate ? new Date(Math.min(lastDayOfMonth, finishDate)) : lastDayOfMonth;
    const fnMap = {
        day: {
            difference: date_fns_1.differenceInCalendarDays,
            add: date_fns_1.addDays,
        },
        week: {
            difference: date_fns_1.differenceInCalendarWeeks,
            add: date_fns_1.addWeeks,
        },
        month: {
            difference: date_fns_1.differenceInCalendarMonths,
            add: date_fns_1.addMonths,
        },
    };
    if (start < firstDayOfMonth) {
        // calculate the difference in recurrence type between start date and first day of month
        let difference = fnMap[recurrenceType].difference(firstDayOfMonth, start);
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
            currentDate = (0, date_fns_1.nextDay)(currentDate, specificDayOfWeek);
        }
        else if (recurrenceType === "month") {
            if (firstLastDayOfMonth === "first_business" && (0, date_fns_1.isWeekend)(currentDate)) {
                currentDate = (0, date_fns_1.addBusinessDays)(currentDate, 1);
            }
            else if (firstLastDayOfMonth === "last_business") {
                currentDate = (0, date_fns_1.isWeekend)(lastDayOfMonth) ? (0, date_fns_1.subBusinessDays)(lastDayOfMonth, 1) : lastDayOfMonth;
            }
            else if (firstLastDayOfMonth === "last") {
                currentDate = lastDayOfMonth;
            }
            else if (firstLastDayOfMonth === "specific") {
                currentDate = new Date(year, month, specificDayOfMonth);
            }
        }
        while (currentDate <= endDate) {
            const dateIndex = currentDate.getDate() - 1;
            daysInMonth[dateIndex].transactions.push(transaction);
            currentDate = fnMap[recurrenceType].add(currentDate, recurrenceRate);
        }
    }
};
exports.getTransactionDatesInMonth = getTransactionDatesInMonth;
const groupTransactionsByMonth = (transactions, year) => {
    const months = [
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
        (0, exports.getTransactionDatesInYear)(transaction, months, year);
    });
    months.forEach((month) => {
        month.remaining = month.income - month.expenses;
    });
    return months;
};
exports.groupTransactionsByMonth = groupTransactionsByMonth;
const groupTransactionsByDaysInMonth = (transactions, year, month) => {
    const daysInMonth = [];
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
        daysInMonth.push({ date: `${i}${getOrdinalSuffix(i)}`, transactions: [] });
    }
    transactions.forEach((transaction) => {
        (0, exports.getTransactionDatesInMonth)(transaction, daysInMonth, year, month);
    });
    return daysInMonth;
};
exports.groupTransactionsByDaysInMonth = groupTransactionsByDaysInMonth;
