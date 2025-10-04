declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "production" | "staging" | "development";
    }
}

declare namespace Intl {
    type SupportedValuesOfKey = "calendar" | "collation" | "currency" | "numberingSystem" | "timeZone" | "unit";
    function supportedValuesOf(key: SupportedValuesOfKey): string[];
}
