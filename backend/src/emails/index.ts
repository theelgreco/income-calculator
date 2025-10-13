import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export const enum EmailSenders {
    BOSS = "stelios@fidelio.club",
    NOREPLY = "noreply@fidelio.club",
}

type EmailOptions = MailOptions & { from: EmailSenders };

export async function sendEmail(emailOptions: EmailOptions) {
    return await createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT as string),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
            user: emailOptions.from,
            pass: process.env.EMAIL_PASSWORD,
        },
    }).sendMail({ ...emailOptions });
}
