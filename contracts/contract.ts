import { initContract } from "@ts-rest/core";
import { z } from "zod";

const client = initContract();

const contract = client.router(
    {
        getUser: {
            method: "GET",
            path: "/user",
            responses: {
                200: client.type<User>(),
            },
        },
    },
    {
        pathPrefix: "/api",
    }
);
