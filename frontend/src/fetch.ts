import { type ConfigurationParameters, Configuration } from "@/api";

const defaultApiConfigurationParameters: ConfigurationParameters = {
    // @ts-ignore
    basePath: process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/api",
    headers: {
        Authorization: localStorage.getItem("jwt") || "",
    },
};

export const defaultApiConfiguration = new Configuration(defaultApiConfigurationParameters);
