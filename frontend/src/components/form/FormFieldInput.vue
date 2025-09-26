<script setup lang="ts">
import { inject } from "vue";
import type { FormContext } from "./Form.vue";
import type { FormFieldGroupProps } from "./FormFieldGroup.vue";

interface Props {
    type?: string;
    placeholder?: string;
}

const props = defineProps<Props>();

const { form, resetFieldError, fieldHasError, submitting } = inject<FormContext>("formContext")!;

const field: FormFieldGroupProps["field"] = inject<FormFieldGroupProps["field"]>("fieldContext")!;

function onInput(e: Event) {
    resetFieldError(field);
}
</script>

<template>
    <Input
        v-model="form[field] as string"
        :type="type"
        :placeholder="placeholder"
        class="pl-10 py-5 rounded-xs"
        :disabled="submitting"
        :aria-invalid="fieldHasError(field)"
        @input="onInput"
    />
</template>
