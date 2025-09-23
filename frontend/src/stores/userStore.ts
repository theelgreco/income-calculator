import { AuthenticationApi, UsersApi, type User } from "@/api/generated";
import { defaultApiConfiguration } from "@/fetch";
import router from "@/router";
import authContract from "@stelan/auth-contract";
import { initClient } from "@ts-rest/core";
import { defineStore } from "pinia";
import { ref } from "vue";

const authClient = initClient(authContract, {
    baseUrl: process.env.NODE_ENV === "production" ? "https://auth.cinewhere.co.uk" : "http://localhost:9090",
});

export const useUserStore = defineStore("user", () => {
    const user = ref<User | null>(null);

    const authenticationApi = new AuthenticationApi(defaultApiConfiguration);

    const usersApi = new UsersApi(defaultApiConfiguration);

    async function validateJWT() {
        await authenticationApi.apiValidateJWTGet();

        if (!user.value) {
            user.value = await usersApi.apiUserGet();
        }
    }

    async function login(email: string, password: string) {
        try {
            const response = await authClient.postLogin({ body: { serviceName: "income_calculator", emailOrUsername: email, password } });

            if (response.status !== 200) {
                throw new Error();
            }

            const { jwt } = response.body;

            localStorage.setItem("jwt", jwt);

            user.value = await usersApi.apiUserGet();

            router.replace({ name: "year", params: { year: new Date().getFullYear() } });
        } catch (err: any) {
            console.error(err);
        }
    }

    async function signUp(email: string, password: string) {
        try {
            const response = await authClient.postSignUp({ body: { username: "ste", email, password, serviceName: "income_calculator" } });

            if (response.status !== 200) throw new Error();

            await login(email, password);
        } catch (err: any) {
            console.error(err);
        }
    }

    function googleRedirect() {
        const params = new URLSearchParams({
            scope: "openid email profile",
            include_granted_scopes: "true",
            response_type: "token",
            redirect_uri:
                process.env.NODE_ENV === "production" ? "https://income-calculator-ten.vercel.app/login" : "http://localhost:5173/login",
            client_id: "545142393929-1jg47rom4v7hcfjvpjgkuhtkca9a73kb.apps.googleusercontent.com",
        });
        const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        window.location.href = googleAuthURL;
    }

    async function signInWithGoogle(token: string) {
        const response = await authClient.postGoogleSignIn({ body: { serviceName: "income_calculator", token } });

        if (response.status !== 200) {
            throw new Error();
        }

        const { jwt } = response.body;

        localStorage.setItem("jwt", jwt);

        user.value = await usersApi.apiUserGet();

        router.replace({ name: "year", params: { year: new Date().getFullYear() } });
    }

    function logout() {
        localStorage.removeItem("jwt");
        user.value = null;
        router.replace({ name: "login" });
    }

    return { user, validateJWT, login, signUp, signInWithGoogle, googleRedirect, logout };
});
