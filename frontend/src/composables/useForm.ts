import { ref } from "vue";
import z from "zod";

export default function useForm<FormSchemaType>(formSchema: z.ZodObject) {
    const form = ref<FormSchemaType>(formSchema.default({}).parse({}) as FormSchemaType);
    const errors = ref<z.core.$ZodFlattenedError<FormSchemaType>>();

    const initialState = form.value;

    const submit = (callback: () => any): (() => void) => {
        return () => {
            try {
                formSchema.parse(form.value);
                callback();
            } catch (err: unknown) {
                if (err instanceof z.ZodError) {
                    const typedErr = err as z.ZodError<FormSchemaType>;
                    errors.value = typedErr.flatten();
                }
            }
        };
    };

    const resetForm = (): void => {
        form.value = initialState;
        resetErrors();
    };

    const resetErrors = (): void => {
        errors.value = undefined;
    };

    const resetFieldError = (field: keyof FormSchemaType): void => {
        if (errors.value) delete errors.value.fieldErrors[field];
    };

    const setFieldError = (field: keyof FormSchemaType, error: string | string[] = []): void => {
        if (errors.value) errors.value.fieldErrors[field] = [...error];
    };

    const fieldHasError = (field: keyof FormSchemaType): boolean => {
        return !!errors.value?.fieldErrors?.[field]?.length;
    };

    return { form, errors, submit, resetForm, resetErrors, resetFieldError, setFieldError, fieldHasError };
}
