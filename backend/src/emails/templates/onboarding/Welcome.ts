import BaseEmail from "../BaseEmail";

interface WelcomeProps {
    name: string;
}

export default function WelcomeEmail({ name }: WelcomeProps) {
    const content = `
        <div style="padding:2rem;padding-top:1rem;">
            <h1 style="font-size: 24px; color: #fff; margin: 0;">Welcome to Fidelio Club${name ? `, ${name}` : ""}!</h1>
            <h2 style="font-size: 18px; color: #fff; font-weight:400; margin-top: 0.5rem;">
                We're excited to have you on board.
            </h2>
            <p style="font-size: 14px; color: #fff; font-weight:400; margin-top: 2rem;">
                At Fidelio Club, our mission is to empower you to take control of your financial future. 
                As a member, you'll have access to powerful tools which will help you in achieving this.
            </p>
            <p style="font-size: 14px; color: #fff; font-weight:400; margin-top: 2rem;">
                To get started, log in to your account and explore your personalized dashboard. If you have any questions or need assistance, our team is always here to help.
            </p>
            <p style="font-size: 14px; color: #fff; font-weight:400; margin-top: 2rem;">
                Welcome aboard, and here's to your financial success!
            </p>
        </div>

        <div style="padding-inline:2rem;padding-bottom:1rem;">
            <button style="width:100%;display:flex;margin-top:1rem;background-color:#111;color:white;border:1px solid #333;outline:0;border-radius:5px;">
                <a href="https://www.fidelio.club" style="color:white;width:100%;height:100%;padding:0.75rem;">Login</a>
            </button>
        </div>
    `;

    return { html: BaseEmail(content, "Welcome to Fidelio Club").html, subject: "Welcome to Fidelio Club" };
}
