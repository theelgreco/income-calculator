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
exports.createUser = createUser;
exports.getUser = getUser;
exports.getYearTransactions = getYearTransactions;
exports.getMonthTransactions = getMonthTransactions;
exports.createNewTransaction = createNewTransaction;
const connect_1 = require("../../prisma/connect");
const helpers_1 = require("../helpers/helpers");
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield connect_1.prisma.user.create({ data: { id: data.user_id, email: data.email } });
        }
        catch (err) {
            throw err;
        }
    });
}
function getUser(authSlug) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield connect_1.prisma.user.findUnique({ where: { id: authSlug } });
        }
        catch (err) {
            throw err;
        }
    });
}
function getYearTransactions(year, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield connect_1.prisma.transaction.findMany({
                where: {
                    userId,
                    AND: [
                        { OR: [{ startDate: { lte: new Date(`${year}-12-31`) } }, { startDate: null }] },
                        { OR: [{ finishDate: { gte: new Date(`${year}-1-01`) } }, { finishDate: null }] },
                    ],
                },
            });
            return (0, helpers_1.groupTransactionsByMonth)(transactions, year);
        }
        catch (err) {
            throw err;
        }
    });
}
function getMonthTransactions(year, month, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield connect_1.prisma.transaction.findMany({
                where: {
                    userId,
                    AND: [
                        { OR: [{ startDate: { lte: new Date(year, month + 1, 0) } }, { startDate: null }] },
                        { OR: [{ finishDate: { gte: new Date(year, month) } }, { finishDate: null }] },
                    ],
                },
            });
            return (0, helpers_1.groupTransactionsByDaysInMonth)(transactions, year, month);
        }
        catch (err) {
            throw err;
        }
    });
}
function createNewTransaction(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield connect_1.prisma.transaction.create({ data });
            return transaction;
        }
        catch (err) {
            throw err;
        }
    });
}
