declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "production" | "staging" | "development";
    }
}
