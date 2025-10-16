import { initContract } from "@ts-rest/core";
import z from "zod";
import { TransactionSchema } from "../../prisma/generated/zod";

const client = initContract();

export const transactionContract = client.router({
    getTransactions: {
        method: "GET",
        path: "/transactions",
        summary: "Retrieve a list of the current user's transactions",
        query: z.object({
            isExpense: z.coerce.boolean().optional(),
        }),
        responses: {
            200: z.array(TransactionSchema),
        },
    },
});
