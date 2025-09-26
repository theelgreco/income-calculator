import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import type { MotionProps } from "motion-v";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ErrorWithMessage = {
    message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        typeof error === "object" && error !== null && "message" in error && typeof (error as Record<string, unknown>).message === "string"
    );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) return maybeError;

    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references for example.
        return new Error(String(maybeError));
    }
}

export function getErrorMessage(error: unknown) {
    return toErrorWithMessage(error).message;
}

export const delay = async (timeInMs: number = 1000): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeInMs);
    });
};

type DeepMerge<T, U> = {
    [K in keyof T | keyof U]: K extends keyof T
        ? K extends keyof U
            ? T[K] extends object
                ? U[K] extends object
                    ? DeepMerge<T[K], U[K]> // deep merge objects
                    : U[K]
                : U[K]
            : T[K]
        : K extends keyof U
        ? U[K]
        : never;
};

export function mergeMotions<T extends MotionProps, U extends MotionProps>(a: T, b: U): DeepMerge<T, U>;

export function mergeMotions<T extends MotionProps, U extends MotionProps, V extends MotionProps>(
    a: T,
    b: U,
    c: V
): DeepMerge<DeepMerge<T, U>, V>;

// fallback for any number
export function mergeMotions(...motions: MotionProps[]): MotionProps {
    return motions.reduce<MotionProps>((acc, motion) => {
        const merged: MotionProps = { ...acc, ...motion };

        const deepKeys: (keyof MotionProps)[] = [
            "initial",
            "animate",
            "exit",
            "variants",
            "whileHover",
            "whileFocus",
            "whileDrag",
            "transition",
        ];

        for (const key of deepKeys) {
            if (acc[key] && motion[key]) {
                merged[key] = { ...(acc[key] as object), ...(motion[key] as object) };
            }
        }

        return merged;
    }, {});
}
