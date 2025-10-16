import { User } from "../prisma/generated";

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}
