<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { useUserStore } from "@/stores/userStore";
import { Lock, Mail } from "lucide-vue-next";
import TextDivider from "@/components/TextDivider.vue";
import z from "zod";
import useForm from "@/composables/useForm";
import { Form, FormHeader, FormFieldGroup, FormField, FormFieldInput, FormFieldIcon, FormFieldError, FormFooter } from "@/components/form";

const { signUp, login, googleRedirect } = useUserStore();

const formSchema = z.object({
    email: z.email().default(""),
    password: z.string().min(8, "Minimum 8 characters").default(""),
});

const form = useForm<z.infer<typeof formSchema>>(formSchema);

const handleLogin = form.submit(() => {
    login(form.form.value.email, form.form.value.password);
});

const handleSignUp = form.submit(() => {
    signUp(form.form.value.email, form.form.value.password);
});
</script>

<template>
    <Form :formSchema="formSchema" :form="form" class="flex flex-col gap-4 flex-grow p-15 shadow-xl bg-white rounded-xl" @submit.prevent="">
        <FormHeader></FormHeader>
        <FormFieldGroup field="email">
            <FormField>
                <FormFieldInput placeholder="Email" />
                <FormFieldIcon :icon="Mail" />
            </FormField>
            <FormFieldError />
        </FormFieldGroup>
        <FormFieldGroup field="password">
            <FormField>
                <FormFieldInput type="password" placeholder="Password" />
                <FormFieldIcon :icon="Lock" />
            </FormField>
            <FormFieldError />
        </FormFieldGroup>
        <FormFooter>
            <div class="flex flex-col mt-4 gap-3">
                <Button class="rounded-xs py-5" @click="handleLogin" type="submit">Login</Button>
                <Button variant="outline" class="rounded-xs py-5" @click="handleSignUp" type="submit">Sign up</Button>
            </div>
            <TextDivider>or</TextDivider>
            <Button variant="outline" class="relative rounded-xs py-5" @click="googleRedirect">
                <img class="absolute left-2" src="@/assets/icons/google.svg" width="20" />
                Sign in with Google
            </Button>
            <Button>Reset form</Button>
        </FormFooter>
    </Form>
</template>
