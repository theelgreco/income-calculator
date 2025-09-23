<script setup lang="ts">
import { inject, provide } from "vue";
import type { FormContext } from "./Form.vue";

inject<FormContext>("formContext");

export interface FormFieldGroupProps {
    field: keyof FormContext["form"]["value"];
}

const props = defineProps<FormFieldGroupProps>();

provide<FormFieldGroupProps["field"]>("fieldContext", props.field);
</script>

<template>
    <div class="flex flex-col gap-1">
        <slot />
    </div>
</template>
