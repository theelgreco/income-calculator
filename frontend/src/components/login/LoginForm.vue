<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { Lock, Mail } from "lucide-vue-next";
import z from "zod";
import useForm from "@/composables/useForm";
import { onMounted } from "vue";
import { toast } from "vue-sonner";
import { getErrorMessage } from "@/lib/utils";
import { useRoute } from "vue-router";

const route = useRoute();

const { signUp, login, googleRedirect, signInWithGoogle } = useUserStore();

const formSchema = z.object({
    email: z
        .email()
        .default("")
        .transform((str) => str.toLowerCase()),
    password: z.string().min(8, "Minimum 8 characters").default(""),
});

const form = useForm<z.infer<typeof formSchema>>(formSchema);

const handleLogin = () => {
    const loginPromise = form.submit(async () => {
        await login(form.form.value.email, form.form.value.password);
    });
    toast.promise(loginPromise, {
        loading: "Logging you in...",
        error: (err: unknown) => {
            return getErrorMessage(err);
        },
    });
};

const handleSignUp = () => {
    const signUpPromise = form.submit(async () => {
        await signUp(form.form.value.email, form.form.value.password);
    });
    toast.promise(signUpPromise, {
        loading: "Signing you up...",
    });
};

async function handleGoogleSignIn(googleAccessToken: string) {
    const googlePromise = signInWithGoogle(googleAccessToken);
    form.submitting.value = true;
    toast.promise(googlePromise, {
        loading: "Signing you in via Google...",
        error: (err: any) => {
            return getErrorMessage(err);
        },
        finally: () => {
            form.submitting.value = false;
        },
    });
}

onMounted(() => {
    const urlParams = new URLSearchParams(route.hash.replace("#", ""));
    const googleAccessToken = urlParams.get("access_token");

    if (googleAccessToken) {
        handleGoogleSignIn(googleAccessToken);
    }
});
</script>

<template>
    <div>
        <Form
            :formSchema="formSchema"
            :form="form"
            class="flex flex-col gap-4 p-10 sm:p-15 md:shadow-xl bg-white rounded-xl"
            @submit.prevent=""
        >
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
            <FormFooter class="flex flex-col gap-6">
                <div class="flex flex-col mt-4 gap-3">
                    <Button class="rounded-xs py-5" @click="handleLogin" type="submit" :disabled="form.submitting.value">Login</Button>
                    <Button variant="outline" class="rounded-xs py-5" @click="handleSignUp" type="submit" :disabled="form.submitting.value">
                        Sign up
                    </Button>
                </div>
                <TextDivider>or</TextDivider>
                <Button variant="outline" class="relative rounded-xs py-5" @click="googleRedirect" :disabled="form.submitting.value">
                    <img class="absolute left-2" src="@/assets/icons/google.svg" width="20" />
                    Sign in with Google
                </Button>
                <div class="flex flex-col items-center mt-10 mx-auto">
                    <small class="text-center"> Want to try it out first? </small>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <small class="text-violet-600">Continue as guest</small>
                            </TooltipTrigger>
                            <TooltipContent asChild :motions="{ initial: { scale: 0 }, animate: { scale: 1 } }">
                                <p>Coming soon</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </FormFooter>
        </Form>
    </div>
</template>
