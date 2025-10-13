import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export const enum EmailSenders {
    BOSS = "stelios@fidelio.club",
    NOREPLY = "no-reply@fidelio.club",
}

type EmailOptions = MailOptions & { from: EmailSenders };

export async function sendEmail(emailOptions: EmailOptions) {
    try {
        const transporter = createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT as string),
            secure: process.env.EMAIL_SECURE === "true",
            auth: {
                user: emailOptions.from,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        return await transporter.sendMail({ ...emailOptions });
    } catch (err: unknown) {
        console.error(err);
    }
}
