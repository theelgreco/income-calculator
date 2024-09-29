"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("../errors/errors");
const models_1 = require("../models/models");
function authenticateJWT(request, response, next) {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    try {
        if (!token) {
            throw new errors_1.UnauthorisedError("No JWT provided");
        }
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY, (err, JWT) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                next(new errors_1.UnauthorisedError("Invalid JWT provided"));
            }
            try {
                if (JWT && typeof JWT === "object") {
                    request.user = yield (0, models_1.getUser)(JWT.user_id);
                    if (!request.user) {
                        const userData = {
                            user_id: JWT.user_id,
                            email: JWT.email,
                        };
                        request.user = yield (0, models_1.createUser)(userData);
                    }
                }
                next();
            }
            catch (err) {
                next(err);
            }
        }));
    }
    catch (error) {
        next(error);
    }
}
