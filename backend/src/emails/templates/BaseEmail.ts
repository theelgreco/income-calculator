export default function BaseEmail(content: string, title?: string) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>${title ?? ""}</title>
            </head>
            <body style="box-sizing:border-box;margin:0;padding:0;width:100vw;height:100vh;font-family:system-ui;background-image:linear-gradient(to bottom right, rgb(32, 32, 32), rgb(0, 0, 0));">
                <div style="display:flex;flex-direction:column;margin-inline:auto;max-width:600px;background-color:rgba(55, 55, 55, 0.3);padding:2rem;margin-block:2rem;border-radius:10px;border:1px solid rgba(55, 55, 55, 0.5);">
                    <header style="padding-inline:1rem;max-width:250px;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/income-tracker-88b7c.appspot.com/o/assets%2Fbanner-no-bg.png?alt=media" style="width:100%;"/>
                    </header>
                    
                    <hr style="width:100%;border:0;border-top:1px solid rgb(50, 50, 50);margin-block:2rem;"/>    
                
                    ${content || `<p style="text-align:center;color:white">Blank email</p>`}

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
            </body>
        </html>
`;
}
