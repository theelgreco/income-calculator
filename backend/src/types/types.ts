import { Request } from "express";

export interface UserModel {
    id: string;
    createdAt: Date;
    name: string;
    email: string;
}

export interface CustomRequest extends Request {
    user?: UserModel;
}

export interface JWT {
    exp: Date;
    iat: Date;
    user_id: string;
    name: string;
    email: string;
    service: string;
    session_id: number;
}

export interface NewTransactionData {
    startTime: Date;
    finishTime: Date | null;
    isExpense: boolean;
    amount_in_pence: number;
    frequency_interval_in_days: number;
    userId: string;
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
