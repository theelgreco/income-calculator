import BaseEmail from "../BaseEmail";

interface WelcomeProps {
    name: string;
}

export default function WelcomeEmail({ name }: WelcomeProps) {
    const content = `
        <div style="display:flex;flex-direction:column;margin-inline:auto;max-width:600px;background-color:rgba(55, 55, 55, 0.3);padding:2rem;margin-block:2rem;border-radius:10px;border:1px solid rgb(55, 55, 55);">
            <img src="https://firebasestorage.googleapis.com/v0/b/income-tracker-88b7c.appspot.com/o/assets%2Fbanner-no-bg.png?alt=media" style="max-width:250px;"/>
            <hr style="width:100%;border:0;border-top:1px solid rgb(50, 50, 50);margin-block:2rem;"/>

            <div>
                <h1 style="font-size: 24px; color: #fff; margin: 0;">Welcome to Fidelio Club${name ? `, ${name}` : ""}!</h1>
                <h2 style="font-size: 18px; color: #fff; font-weight:400; margin-top: 0.5rem;">
                    We're excited to have you on board.
                </h2>
                <p style="font-size: 14px; color: #fff; font-weight:400; margin-top: 2rem;">
                    At Fidelio Club, our mission is to empower you to take control of your financial future. 
                    As a member, you'll have access to powerful tools which will help you in achieving this.
                </p>
                <p style="font-size: 14px; color: #fff; font-weight:400; margin: 0;">
                    To get started, log in to your account and explore your personalized dashboard. If you have any questions or need assistance, our team is always here to help.
                </p>
                <p style="font-size: 14px; color: #fff; font-weight:400; margin-top: 2rem;">
                    Welcome aboard, and here's to your financial success!
                </p>
            </div>

            <button style="display:flex;margin-top:1rem;background-color:#111;color:white;border:1px solid #333;outline:0;border-radius:5px;">
                <a href="https://www.fidelio.club" style="color:white;width:100%;height:100%;padding:0.75rem;">Login</a>
            </button>
            
            <hr style="width:100%;border:0;border-top:1px solid rgb(50, 50, 50);margin-block:2rem;"/>
            <footer style="color:#bbb;font-size:12px;text-align:center;">
                <div>
                    This email was sent by Fidelio Club.
                </div>
                <div>
                    You are receiving this email because you signed up for a Fidelio Club account.
                </div>
                <div style="margin-top:0.5rem;">
                    &copy; ${new Date().getFullYear()} Fidelio Club. All rights reserved.
                </div>
                <div style="margin-top:0.5rem;">
                    If you have any questions, contact us at <a href="mailto:support@fidelio.club" style="color:#bbb;">support@fidelio.club</a>.
                </div>
                <div style="margin-top:0.5rem;">
                    <a href="https://fidelio.club/unsubscribe" style="color:#bbb;text-decoration:underline;">Unsubscribe</a>
                </div>
            </footer>
        </div>
    `;

    return BaseEmail(content, "Welcome to Fidelio Club");
}
