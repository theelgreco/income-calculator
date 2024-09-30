import { Secret, verify } from "jsonwebtoken";
import { UnauthorisedError } from "../errors/errors";
import { getUser, createUser } from "../models/models";
import type { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { getDefaultUserImage } from "../firebase/storage";

export function authenticateJWT(request: Request & { user?: User | null }, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    try {
        if (!token) {
            throw new UnauthorisedError("No JWT provided");
        }

        verify(token, process.env.JWT_KEY as Secret, async (err, JWT) => {
            if (err) {
                next(new UnauthorisedError("Invalid JWT provided"));
            }

            try {
                if (JWT && typeof JWT === "object") {
                    request.user = await getUser(JWT.user_id);

                    if (!request.user) {
                        const userData: {
                            user_id: string;
                            username: string;
                            email: string;
                            image: string;
                        } = {
                            user_id: JWT.user_id,
                            username: JWT.username,
                            email: JWT.email,
                            image: getDefaultUserImage(),
                        };

                        request.user = await createUser(userData);
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
