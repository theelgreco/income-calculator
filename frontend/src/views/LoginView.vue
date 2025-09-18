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

<template></template>
