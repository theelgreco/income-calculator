export interface Currency {
    /**
     * Display name of the currency.
     *
     * For example: `British Pound` or `US Dollar`
     */
    name: string;
    /**
     * The symbol or abbreviation of the currency.
     *
     * For example: `£` or `$`
     */
    symbol: string;
    /**
     * ISO 4217 currency code.
     *
     * For example: `GBP` or `USD`
     * @see https://www.iso.org/iso-4217-currency-codes.html
     */
    code: string;
    /**
     * Label in the format `{name} ({code})`.
     *
     * For example: `British Pound (GBP)` or `US Dollar (USD)`
     */
    label: string;
}

export function useCurrency(): {
    currencies: Currency[];
    getCurrencyFromCode: (code: Currency["name"]) => Currency | null;
    getFormattedCurrencyString: (value: number | bigint, code: Currency["code"]) => string;
} {
    const locale = navigator.language; // en-GB, en-US, etc.

    const displayNames = new Intl.DisplayNames(locale, { type: "currency" });

    const currencyCodes = Intl.supportedValuesOf("currency"); // "GBP", "USD", etc.

    const currencies: Currency[] = currencyCodes
        .map((code) => {
            const formatOptions: Intl.NumberFormatOptions = { style: "currency", currencyDisplay: "narrowSymbol", currency: code };
            // prettier-ignore
            const currencySymbol = new Intl.NumberFormat(locale, formatOptions).formatToParts(0).find((part) => part.type === "currency")!.value;
            const currencyName = displayNames.of(code)!; // "British Pound", "US Dollar", etc.

            return {
                name: currencyName,
                symbol: currencySymbol,
                code,
                label: `${currencyName} (${code})`,
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name, locale));

    function getCurrencyFromCode(code: Currency["name"]): Currency | null {
        return currencies.find((currency) => currency.code === code) || null;
    }

    function getFormattedCurrencyString(value: number | bigint, code: Currency["code"]) {
        const formatOptions: Intl.NumberFormatOptions = { style: "currency", currencyDisplay: "narrowSymbol", currency: code };

        return new Intl.NumberFormat(locale, formatOptions).format(value);
    }

    return { currencies, getCurrencyFromCode, getFormattedCurrencyString };
}
