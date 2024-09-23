import { Secret, verify } from "jsonwebtoken";
import { UnauthorisedError } from "../errors/errors";
import { getUser, createUser } from "../models/models";
import type { Request, Response, NextFunction } from "express";

export function authenticateJWT(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    try {
        if (!token) {
            throw new UnauthorisedError("No JWT provided");
        }

        verify(token, process.env.JWT_KEY as Secret, async (err, JWT) => {
            if (err) {
                throw new UnauthorisedError("Invalid JWT provided");
            }

            try {
                const customRequest = request as Request & { user?: any };

                if (JWT && typeof JWT === "object") {
                    customRequest.user = await getUser(JWT.user_id);

                    if (!customRequest.user) {
                        const userData: {
                            user_id: string;
                            email: string;
                        } = {
                            user_id: JWT.user_id,
                            email: JWT.email,
                        };

                        customRequest.user = await createUser(userData);
                    }
                }

                next();
            } catch (err) {
                next(err);
            }
        });
    } catch (error) {
        next(error);
    }
}
