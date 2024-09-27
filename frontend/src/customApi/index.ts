interface SignUpData {
    email: string;
    password: string;
}

interface LoginData extends SignUpData {}

export interface TransactionCreateSerializer {
    name: string;
    isExpense: boolean | null;
    amountInPence: number | null;
    startDate: Date | null;
    finishDate: Date | null;
    isRecurring: boolean | null;
    recurrenceType: "day" | "week" | "month" | "year" | null;
    recurrenceRate: number | null;
    recurrenceRateType: "first_business" | "last_business" | "last" | "specific" | null;
    specificDayOfWeek: number | null;
    specificDayOfMonth: number | null;
    firstLastDayOfMonth: "first_business" | "last_business" | "last" | "specific" | null;
}

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

    async getYearData(year: number): Promise<any> {
        try {
            const headers: HeadersInit = {};

            if (this.authorisationHeader) {
                headers.Authorization = this.authorisationHeader;
            }

            const response = await fetch(`${this.basePath}/transactions/${year}`, {
                method: "GET",
                headers,
            });

            return response;
        } catch (err: any) {
            throw err;
        }
    }

    async transactionCreate(data: TransactionCreateSerializer) {
        try {
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };

            if (this.authorisationHeader) {
                headers.Authorization = this.authorisationHeader;
            }

            const response = await fetch(`${this.basePath}/transactions`, {
                method: "POST",
                body: JSON.stringify(data),
                headers,
            });

            return response;
        } catch (err: any) {
            throw err;
        }
    }
}
