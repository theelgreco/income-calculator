import z from "zod";
import { userContract } from "./contracts/user-contract";
import { transactionContract } from "./contracts/transaction-contract";
import { initContract } from "@ts-rest/core";

const client = initContract();

export const contract = client.router(
    {
        users: userContract,
        transactions: transactionContract,
    },
    {
        baseHeaders: {
            Authorization: z.string(),
        },
        pathPrefix: "/api",
    }
);
