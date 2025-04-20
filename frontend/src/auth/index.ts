interface SignUpData {
    username: string;
    email: string;
    password: string;
}

interface LoginData {
    email_or_username: string;
    password: string;
}

export class AuthenticationServer {
    // prettier-ignore
    // @ts-ignore
    basePath: string = process.env.NODE_ENV === "production" ? "https://auth.cinewhere.co.uk" : "http://localhost:9090"
    authorisationHeader = null;

    async signUp(data: SignUpData): Promise<any> {
        try {
            const response = await fetch(`${this.basePath}/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...data, service: "income_calculator"}),
            });
            return await response.json();
        } catch (err: any) {
            throw err;
        }
    }

    async login(data: LoginData): Promise<any> {
        try {
            const response = await fetch(`${this.basePath}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...data, service: "income_calculator"}),
            });

            if (response.status < 200 || response.status > 299) {
                throw new Error(await response.text());
            }

            return await response.json();
        } catch (err: any) {
            throw err;
        }
    }
}
