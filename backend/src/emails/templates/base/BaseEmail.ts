export function BaseEmail(content: string, title?: string) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>${title ?? ""}</title>
            </head>
            <body style="margin: 0; padding: 0">
                ${content ?? ""}
            </body>
        </html>
`;
}
