"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForbiddenError = exports.InvalidLoginError = exports.UnauthorisedError = exports.KeyError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class KeyError extends Error {
    constructor(message) {
        super(message);
        this.name = "KeyError";
    }
}
exports.KeyError = KeyError;
class UnauthorisedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorisedError";
    }
}
exports.UnauthorisedError = UnauthorisedError;
class InvalidLoginError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidLoginError";
    }
}
exports.InvalidLoginError = InvalidLoginError;
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
