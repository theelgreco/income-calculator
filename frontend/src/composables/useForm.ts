import { ref } from "vue";
import z from "zod";

/**
 * A Vue 3 composable for managing form state and validation using Zod.
 *
 *
 * Each field in the zod schema must provide a default value via `.default()` so the form can initialise with default values.
 *
 *
 * Returns a set of reactive form state and helper methods for validation, submission, and error handling.
 */
export default function useForm<FormSchemaType>(formSchema: z.ZodObject) {
    /** Ref object holding the form’s current state. */
    const form = ref<FormSchemaType>(formSchema.default({}).parse({}) as FormSchemaType);

    /** Ref object holding validation errors returned by Zod. */
    const errors = ref<z.core.$ZodFlattenedError<FormSchemaType>>();

    /** The form's initial state (used when resetting). */
    const initialState = JSON.parse(JSON.stringify(form.value));

    /**
     * Validates the form before running the given callback.
     * - If valid → runs the callback.
     * - If invalid → populates `errors`.
     */
    const submit = (callback: () => any): (() => void) => {
        return async () => {
            try {
                formSchema.parse(form.value);
                await callback();
            } catch (err: unknown) {
                if (err instanceof z.ZodError) {
                    const typedErr = err as z.ZodError<FormSchemaType>;
                    errors.value = typedErr.flatten();
                }
            }
        };
    };

    /** Resets the form back to its initial state and clears all errors. */
    const resetForm = (): void => {
        form.value = initialState;
        resetErrors();
    };

    /** Clears all validation errors without affecting form values. */
    const resetErrors = (): void => {
        errors.value = undefined;
    };

    /** Removes validation errors for a specific field. */
    const resetFieldError = (field: keyof FormSchemaType): void => {
        if (errors.value) delete errors.value.fieldErrors[field];
    };

    /** Manually sets validation errors for a specific field. */
    const setFieldError = (field: keyof FormSchemaType, error: string): void => {
        if (errors.value) errors.value.fieldErrors[field] = [...error];
        else {
            errors.value = new z.ZodError([
                {
                    code: "custom",
                    path: [field],
                    message: error,
                },
            ]).flatten();
        }
    };

    /** Checks if a specific field currently has one or more errors. */
    const fieldHasError = (field: keyof FormSchemaType): boolean => {
        return !!errors.value?.fieldErrors?.[field]?.length;
    };

    return { form, errors, submit, resetForm, resetErrors, resetFieldError, setFieldError, fieldHasError };
}
