export default function BaseEmail(content: string, title?: string) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>${title ?? ""}</title>
            </head>
            <body style="box-sizing:border-box;margin:0;padding:0;width:100vw;height:100vh;font-family:system-ui;background-image:linear-gradient(to bottom right, rgb(32, 32, 32), rgb(0, 0, 0));">
                ${content ?? ""}
            </body>
        </html>
`;
}
