declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "production" | "staging" | "development";
        DATABASE_URL: string;
        JWT_KEY: string;
        PORT?: string;
    }
}
