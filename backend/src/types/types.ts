import { Transaction } from "@prisma/client";

export interface JWT {
    exp: Date;
    iat: Date;
    user_id: string;
    name: string;
    email: string;
    service: string;
    session_id: number;
}

type MonthName =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export interface MonthSerializer {
    monthName: MonthName;
    income: number;
    expenses: number;
    remaining: number;
}

export interface MonthDate {
    date: string;
    transactions: Transaction[];
}
