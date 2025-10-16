import { initContract } from "@ts-rest/core";
import { UserSchema } from "../../prisma/generated/zod";

const client = initContract();

export const userContract = client.router({
    getUser: {
        method: "GET",
        path: "/user",
        summary: "Retrieve the current user's account",
        responses: {
            200: UserSchema,
        },
    },
});
