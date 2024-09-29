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
exports.validateJWT = validateJWT;
exports.getUserData = getUserData;
exports.getYearData = getYearData;
exports.getMonthData = getMonthData;
exports.postNewTransaction = postNewTransaction;
const models_1 = require("../models/models");
const constants_1 = require("../constants");
function validateJWT(request, response) {
    response.status(200).send({ msg: "Your JWT is valid" });
}
function getUserData(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            response.status(200).send(request.user);
        }
        catch (err) {
            next(err);
        }
    });
}
function getYearData(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!request.user) {
                throw new Error("No user provided");
            }
            if (!request.params.year) {
                throw new Error("No year provided");
            }
            else if (request.params.year.length !== 4 || !parseInt(request.params.year)) {
                throw new Error("Invalid year provided");
            }
            const id = request.user.id;
            const year = Number(request.params.year);
            const transactions = yield (0, models_1.getYearTransactions)(year, id);
            response.status(200).send(transactions);
        }
        catch (err) {
            next(err);
        }
    });
}
function getMonthData(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const monthIndex = constants_1.validMonthStrings.findIndex((el) => el === request.params.month);
            if (!request.user) {
                throw new Error("No user provided");
            }
            if (!request.params.year) {
                throw new Error("No year provided");
            }
            else if (request.params.year.length !== 4 || !parseInt(request.params.year)) {
                throw new Error("Invalid year provided");
            }
            if (!request.params.month) {
                throw new Error("No month provided");
            }
            else if (monthIndex === -1) {
                throw new Error("Invalid month provided");
            }
            const id = request.user.id;
            const year = Number(request.params.year);
            const month = monthIndex;
            const transactions = yield (0, models_1.getMonthTransactions)(year, month, id);
            response.status(200).send(transactions);
        }
        catch (err) {
            next(err);
        }
    });
}
function postNewTransaction(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, isExpense, amountInPence, startDate, finishDate, isRecurring, recurrenceType, recurrenceRate, recurrenceRateType, specificDayOfWeek, specificDayOfMonth, firstLastDayOfMonth, } = request.body;
        if (startDate)
            startDate = new Date(startDate);
        if (finishDate)
            finishDate = new Date(finishDate);
        const data = {
            userId: request.user.id,
            name,
            isExpense,
            amountInPence,
            startDate,
            finishDate,
            isRecurring,
            recurrenceType,
            recurrenceRate,
            recurrenceRateType,
            specificDayOfWeek,
            specificDayOfMonth,
            firstLastDayOfMonth,
        };
        try {
            const transaction = yield (0, models_1.createNewTransaction)(data);
            response.status(201).send(transaction);
        }
        catch (err) {
            next(err);
        }
    });
}
