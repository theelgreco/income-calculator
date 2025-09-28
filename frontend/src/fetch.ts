import { type ConfigurationParameters, Configuration } from "@/api/generated";

function getApiUrl() {
    switch (process.env.NODE_ENV) {
        case "production":
            return "https://api.fidelio.club";
        case "staging":
            return "https://api.staging.fidelio.club";
        case "development":
            return "http://localhost:8080";
    }
}

const defaultApiConfigurationParameters: ConfigurationParameters = {
    accessToken: async () => {
        return new Promise((resolve) => {
            resolve(localStorage.getItem("jwt") || "");
        });
    },
    basePath: getApiUrl(),
};

export const defaultApiConfiguration = new Configuration(defaultApiConfigurationParameters);
