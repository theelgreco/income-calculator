import { UserModel } from "../types";

declare global {
    namespace Express {
        export interface Request {
            user?: UserModel | null;
        }
    }
}
