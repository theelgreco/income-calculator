import { type ConfigurationParameters, Configuration } from "@/api/generated";

const defaultApiConfigurationParameters: ConfigurationParameters = {
    accessToken: async () => {
        return new Promise((resolve) => {
            resolve(localStorage.getItem("jwt") || "");
        });
    },
    // @ts-ignore
    basePath: process.env.NODE_ENV === "production" ? "https://api.cachee.app" : "http://localhost:8080",
};

export const defaultApiConfiguration = new Configuration(defaultApiConfigurationParameters);
