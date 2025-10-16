import { User } from "../../../prisma/generated";
import { UserModel } from "../types";

declare global {
    namespace Express {
        export interface Request {
            user?: User | null;
        }
    }
}
