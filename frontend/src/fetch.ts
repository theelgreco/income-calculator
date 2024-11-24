import { type ConfigurationParameters, Configuration } from "@/api";

const defaultApiConfigurationParameters: ConfigurationParameters = {
    accessToken: async () => {
        return new Promise((resolve) => {
            resolve(localStorage.getItem("jwt") || "");
        });
    },
    // @ts-ignore
    basePath: process.env.NODE_ENV === "production" ? "http://87.106.68.60:4000" : "http://localhost:8080",
};

export const defaultApiConfiguration = new Configuration(defaultApiConfigurationParameters);
