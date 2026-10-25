export const supportedLanguages = ['de', 'en', 'ar'] as const;
export type Language = typeof supportedLanguages[number];
export type Direction = 'ltr' | 'rtl';

export const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && supportedLanguages.some((language) => language === value);

export const getDirection = (language: Language): Direction => language === 'ar' ? 'rtl' : 'ltr';

export const resolveLanguage = (value: unknown): Language => isLanguage(value) ? value : 'de';