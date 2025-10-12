import { createTransport } from "nodemailer";

export const enum EmailSenders {
    ADMIN = "admin@fidelio.club",
    INFO = "info@fidelio.club",
    NOREPLY = "noreply@fidelio.club",
}

export const emailTransporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
