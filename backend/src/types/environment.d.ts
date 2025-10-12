declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "production" | "staging" | "development";
        DATABASE_URL: string;
        JWT_KEY: string;
        PORT?: string;
        EMAIL_HOST: string;
        EMAIL_PORT: string;
        EMAIL_SECURE: string;
        EMAIL_USER: string;
        EMAIL_PASSWORD: string;
    }
}
