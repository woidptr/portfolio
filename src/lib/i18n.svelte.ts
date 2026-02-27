import I18n from "sveltekit-i18n";

const config = {
    loaders: [
        {
            locale: "en",
            key: "",
            loader: async () => (await import('./locales/en.json')).default
        },
        {
            locale: "cs",
            key: "",
            loader: async () => (await import('./locales/cs.json')).default
        },
        {
            locale: "uk",
            key: "",
            loader: async () => (await import('./locales/uk.json')).default
        }
    ]
};

export const {t, locale, locales, loading, loadTranslations} = new I18n(config)