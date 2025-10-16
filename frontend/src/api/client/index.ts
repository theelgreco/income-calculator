import { contract } from "@api-contract";
import { initClient } from "@ts-rest/core";

export function getAuthToken() {
    const jwt = localStorage.getItem("jwt") ?? "";

    if (jwt !== null) {
        return `Bearer ${jwt}`;
    }

    return "";
}

export function getApiUrl() {
    switch (process.env.NODE_ENV) {
        case "production":
            return "https://api.fidelio.club";
        case "staging":
            return "https://api.staging.fidelio.club";
        case "development":
            return "http://localhost:8080";
    }
}

export const apiClient = initClient(contract, {
    baseUrl: getApiUrl(),
    baseHeaders: {
        Authorization: getAuthToken(),
    },
});
