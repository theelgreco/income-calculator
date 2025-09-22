<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/userStore";

enum TabChoices {
    LOGIN,
    SIGN_UP,
}

const { signUp, login } = useUserStore();

const email = ref<string>();

const username = ref<string>();

const emailOrUsername = ref<string>();

const password = ref<string>();

const activeTab = ref<TabChoices>(TabChoices.LOGIN);

function handleLogin() {
    if (emailOrUsername.value && password.value) {
        login(emailOrUsername.value, password.value);
    }
}

function handleSignUp() {
    if (email.value && username.value && password.value) {
        signUp(username.value, email.value, password.value);
    }
}

function clearForm() {
    email.value = undefined;
    emailOrUsername.value = undefined;
    username.value = undefined;
    password.value = undefined;
}

watch(activeTab, () => {
    clearForm();
});
</script>

<template>
    <div class="flex flex-col items-center justify-center h-full w-full">
        <div class="flex flex-col gap-14 border-1 border-gray-200 p-6 rounded-sm w-[500px] max-w-full max-h-full shadow-lg">
            <h1 class="text-3xl">{{ activeTab === TabChoices.LOGIN ? "Login" : "Sign up" }}</h1>
            <form @submit.prevent="" class="flex flex-col gap-12">
                <div class="flex flex-col gap-5">
                    <template v-if="activeTab === TabChoices.LOGIN">
                        <div class="flex flex-col">
                            <label for="emailOrUsername">Email or username</label>
                            <Input type="text" id="emailOrUsername" v-model="emailOrUsername" />
                        </div>
                    </template>
                    <template v-if="activeTab === TabChoices.SIGN_UP">
                        <div class="flex flex-col">
                            <label for="email">Email</label>
                            <Input v-model="email" id="email" type="email" />
                        </div>
                        <div class="flex flex-col">
                            <label for="username">Username</label>
                            <Input v-model="username" id="username" type="text" />
                        </div>
                    </template>
                    <div class="flex flex-col">
                        <label for="password">Password</label>
                        <Input v-model="password" id="password" type="password" />
                    </div>
                </div>
                <div class="flex flex-col mt-auto gap-6">
                    <template v-if="activeTab === TabChoices.LOGIN">
                        <Button @click="handleLogin" type="submit">Login</Button>
                        <small
                            class="text-center text-primary-600 select-none hover:underline cursor-pointer"
                            @click="activeTab = TabChoices.SIGN_UP"
                        >
                            Don't have an account? Sign up instead.
                        </small>
                    </template>
                    <template v-if="activeTab === TabChoices.SIGN_UP">
                        <Button @click="handleSignUp" type="submit">Sign up</Button>
                        <small
                            class="text-center text-primary-600 select-none hover:underline cursor-pointer"
                            @click="activeTab = TabChoices.LOGIN"
                        >
                            Already have an account? Login instead.
                        </small>
                    </template>
                </div>
            </form>
        </div>
    </div>
</template>
