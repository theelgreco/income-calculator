import { AuthenticationServer } from "@/api/auth";
import { AuthenticationApi, UsersApi, type User } from "@/api/generated";
import { defaultApiConfiguration } from "@/fetch";
import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref<User | null>(null);

    const authServer = new AuthenticationServer();

    const authenticationApi = new AuthenticationApi(defaultApiConfiguration);

    const usersApi = new UsersApi(defaultApiConfiguration);

    async function validateJWT() {
        await authenticationApi.apiValidateJWTGet();

        if (!user.value) {
            user.value = await usersApi.apiUserGet();
        }
    }

    async function login(email_or_username: string, password: string) {
        try {
            const { jwt } = await authServer.login({ email_or_username, password });

            localStorage.setItem("jwt", jwt);

            user.value = await usersApi.apiUserGet();

            router.replace({ name: "year", params: { year: new Date().getFullYear() } });
        } catch (err: any) {
            console.error(err);
        }
    }

    async function signUp(username: string, email: string, password: string) {
        try {
            await authServer.signUp({ email: email, password: password, username: username });
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
