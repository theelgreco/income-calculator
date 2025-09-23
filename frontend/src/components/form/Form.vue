<script setup lang="ts">
import useForm from "@/composables/useForm";
import { provide } from "vue";
import type z from "zod";

interface Props {
    formSchema: z.ZodObject;
    form: ReturnType<typeof useForm<unknown>>;
}

const props = defineProps<Props>();

export type FormContext = ReturnType<typeof useForm<z.infer<typeof props.formSchema>>>;

provide<FormContext>("formContext", props.form as FormContext);
</script>

<template>
    <form @submit.prevent="">
        <slot />
    </form>
</template>
