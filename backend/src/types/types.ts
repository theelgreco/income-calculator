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
