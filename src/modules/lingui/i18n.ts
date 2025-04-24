import {i18n} from '@lingui/core'

export const locales = {
    en: 'English',
    zh: 'Chinese',
}

export const defaultLocale = 'en'

export const isLocaleValid = (locale: string) =>
    Object.keys(locales).includes(locale)

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
    const {messages} = await import(`../../_locales/${locale}/messages`)
    i18n.load(locale, messages)
    i18n.activate(locale)
    console.log('dynamicActivate切换完毕', locale, i18n.locale)
}
