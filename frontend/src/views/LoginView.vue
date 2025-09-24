<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import LoginForm from "@/components/login/LoginForm.vue";

const route = useRoute();

const { signInWithGoogle } = useUserStore();

onMounted(() => {
    const urlParams = new URLSearchParams(route.hash.replace("#", ""));
    const googleAccessToken = urlParams.get("access_token");

    if (googleAccessToken) {
        signInWithGoogle(googleAccessToken);
    }
});
</script>

<template>
    <div class="h-screen flex bg-gradient-to-tl from-yellow-50 to-white to-40%">
        <div class="flex max-lg:hidden w-1/2 border my-60 mx-20"></div>
        <div
            class="md:bg-[#F8F8F8] md:border md:shadow-2xl flex flex-col gap-15 w-full lg:w-1/2 sm:px-10 md:px-35 rounded-3xl md:min-w-[700px]"
        >
            <LoginForm />
        </div>
    </div>
</template>
