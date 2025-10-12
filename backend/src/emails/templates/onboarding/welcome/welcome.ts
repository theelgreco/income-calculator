import { BaseEmail } from "../../base/BaseEmail";

interface WelcomeProps {
    name: string;
}

export default function WelcomeEmail({ name }: WelcomeProps) {
    const content = `
        <div align="center">
            <h1 style="font-size: 24px; color: #222">Welcome to Fidelio Club${name ? `, ${name}` : ""}.</h1>
            <h2 style="font-size: 18px; color: #555">You're one step closer to taking control of your finances.</h2>
            <p style="font-size: 16px; color: #333">It's your time to achieve financial freedom.</p>
        </div>
    `;

    return BaseEmail(content, "Welcome to Fidelio Club");
}
