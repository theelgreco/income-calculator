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

    async function login(emailOrUsername: string, password: string) {
        try {
            const response = await authClient.postLogin({ body: { serviceName: "income_calculator", emailOrUsername, password } });

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

    async function signUp(username: string, email: string, password: string) {
        try {
            const response = await authClient.postSignUp({ body: { username, email, password, serviceName: "income_calculator" } });

            if (response.status !== 200) throw new Error();

            await login(email, password);
        } catch (err: any) {
            console.error(err);
        }
    }

    function logout() {
        localStorage.removeItem("jwt");
        user.value = null;
        router.replace({ name: "login" });
    }

    return { user, login, signUp, logout, validateJWT };
});
