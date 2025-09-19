<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { Lock, Mail } from "lucide-vue-next";
import TextDivider from "@/components/TextDivider.vue";
import { jwtDecode } from "jwt-decode";

enum TabChoices {
    LOGIN,
    SIGN_UP,
}

const { signUp, login, signInWithGoogle } = useUserStore();

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
    <div class="h-screen flex bg-gradient-to-tl from-yellow-50 to-white to-40%">
        <div class="flex max-lg:hidden w-1/2 border my-60 mx-20"></div>
        <div class="bg-[#F8F8F8] shadow-2xl flex flex-col gap-15 w-full lg:w-1/2 my-30 py-25 px-35 border rounded-3xl">
            <!-- Form Container -->
            <div class="flex flex-col gap-4 flex-grow p-15 shadow-xl bg-white rounded-xl">
                <div class="relative w-full items-center">
                    <Input type="email" placeholder="Email" class="pl-10 py-5 rounded-xs" />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                        <Mail class="size-4 text-muted-foreground/50" />
                    </span>
                </div>
                <div class="relative w-full items-center">
                    <Input type="password" placeholder="Password" class="pl-10 py-5 rounded-xs" />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                        <Lock class="size-4 text-muted-foreground/50" />
                    </span>
                </div>
                <div class="flex flex-col mt-4 gap-3">
                    <Button class="rounded-xs py-5">Login</Button>
                    <Button variant="outline" class="rounded-xs py-5">Sign up</Button>
                </div>
                <TextDivider>or</TextDivider>
                <Button variant="outline" class="relative rounded-xs py-5" @click="signInWithGoogle">
                    <img class="absolute left-2" src="../assets/icons/google.svg" width="20" />
                    Sign in with Google
                </Button>
            </div>
            <!-- Continue As Guest -->
            <div class="flex flex-col gap-3">
                <small class="text-center">Want to try it out first?</small>
                <Button variant="secondary" size="lg">Continue as guest</Button>
            </div>
        </div>
    </div>
</template>
