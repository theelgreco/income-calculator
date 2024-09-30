declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            DATABASE_URL: string;
            JWT_KEY: string;
            PORT?: string;
        }
    }
}
