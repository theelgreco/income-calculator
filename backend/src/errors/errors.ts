export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class KeyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "KeyError";
    }
}

export class UnauthorisedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorisedError";
    }
}

export class InvalidLoginError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidLoginError";
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}
