import { type ConfigurationParameters, Configuration } from "@/api";

const defaultApiConfigurationParameters: ConfigurationParameters = {
    accessToken: async () => {
        return new Promise((resolve) => {
            resolve(localStorage.getItem("jwt") || "");
        });
    },
    // @ts-ignore
    basePath: process.env.NODE_ENV === "production" ? "https://income-calculator-s1gk.onrender.com" : "http://localhost:8080",
};

export const defaultApiConfiguration = new Configuration(defaultApiConfigurationParameters);
