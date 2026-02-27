import { loadTranslations } from "$lib/i18n.svelte";

export const prerender = true;

export const load = async () => {
    const initialLocale = "en";

    await loadTranslations(initialLocale);

    return {};
}
