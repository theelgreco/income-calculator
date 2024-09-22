interface SignUpData {
    email: string;
    password: string;
}

interface LoginData extends SignUpData {}

export class AuthenticationServer {
    // prettier-ignore
    // @ts-ignore
    basePath : string = process.env.NODE_ENV === "production" ? "https://ftp-l4ir.onrender.com" : "http://localhost:9090"
    authorisationHeader = null;

    async signUp(data: SignUpData): Promise<any> {
        try {
            const response = await fetch(`${this.basePath}/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, service: "income_calculator" }),
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
                body: JSON.stringify({ ...data, service: "income_calculator" }),
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

export class IncomeCalculatorApi {
    // prettier-ignore
    // @ts-ignore
    basePath : string = process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/api"
    authorisationHeader: string | null = null;

    constructor() {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            this.authorisationHeader = `Bearer ${jwt}`;
        }
    }

    async validateJWT(): Promise<any> {
        try {
            const headers: HeadersInit = {};

            if (this.authorisationHeader) {
                headers.Authorization = this.authorisationHeader;
            }

            const response = await fetch(`${this.basePath}/validateJWT`, {
                method: "GET",
                headers,
            });

            if (response.status < 200 || response.status > 299) {
                throw new Error(await response.text());
            }
        } catch (err) {
            throw err;
        }
    }
}
