import { createTransport } from "nodemailer";

export const enum EmailSenders {
    ADMIN = "admin@fidelio.club",
    INFO = "info@fidelio.club",
    NOREPLY = "noreply@fidelio.club",
    DEV = "noreply@fidelio.club",
}

export function getEmailSender(sender: EmailSenders) {
    if (process.env.NODE_ENV === "production") {
        return sender;
    }

    return EmailSenders.DEV;
}

export const emailTransporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
