import { Secret, verify } from "jsonwebtoken";
import { UnauthorisedError } from "../errors/errors";
import { getUser, createUser } from "../models/models";
import type { Request, Response, NextFunction } from "express";

import { defaultUserImage } from "../firebase/storage";
import { EmailSenders, sendEmail } from "../emails";
import WelcomeEmail from "../emails/templates/onboarding/Welcome";
import { User } from "../../prisma/generated";

export function authenticateJWT(request: Request, _response: Response, next: NextFunction): void {
    const token = request.headers.authorization?.split(" ")[1];

    try {
        if (!token) {
            throw new UnauthorisedError("No JWT provided");
        }

        verify(token, process.env.JWT_KEY as Secret, async (err, JWT) => {
            if (err) {
                throw new UnauthorisedError("Invalid JWT provided");
            }

            try {
                if (JWT && typeof JWT === "object") {
                    request.user = await getUser(JWT.userId);

                    if (!request.user) {
                        const userData: {
                            authId: string;
                            username: string;
                            email: string;
                            image: string;
                        } = {
                            authId: JWT.userId,
                            username: JWT.name,
                            email: JWT.email,
                            image: JWT.image || defaultUserImage,
                        };

                        const user = await createUser(userData);

                        request.user = user;

                        const { html, subject } = WelcomeEmail({ name: user.username! });

                        sendEmail({
                            from: EmailSenders.NOREPLY,
                            to: user.email,
                            subject,
                            html,
                        });
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
