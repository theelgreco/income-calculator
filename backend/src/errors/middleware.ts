import { Request, Response, NextFunction } from "express";

export function handleCustomErrors(error: any, request: Request, response: Response, next: NextFunction) {
    const { message, code, name } = error;

    console.log(`${code} | ${name} | ${message}`);

    if (name === "ValidationError" || name === "KeyError") {
        response.status(400).send({ [name]: message });
    } else if (name === "InvalidLoginError" || name === "UnauthorisedError") {
        response.status(401).send({ [name]: message });
    } else if (name === "ForbiddenError") {
        response.status(403).send({ [name]: message });
    } else if (name === "NotFoundError") {
        response.status(404).send({ [name]: message });
    } else {
        next(error);
    }
}
