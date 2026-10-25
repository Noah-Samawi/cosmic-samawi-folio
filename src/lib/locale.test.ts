import { describe, expect, test } from 'bun:test';
import { getDirection, resolveLanguage, supportedLanguages } from './locale';

describe('portfolio languages', () => {
  test('supports German, English and Arabic', () => {
    expect([...supportedLanguages]).toEqual(['de', 'en', 'ar']);
  });
  test('Arabic uses RTL', () => {
    expect(getDirection('ar')).toBe('rtl');
  });
  test('German and English use LTR', () => {
    expect(getDirection('de')).toBe('ltr');
    expect(getDirection('en')).toBe('ltr');
  });
  test('restores Arabic and falls back to German for invalid stored languages', () => {
    expect(resolveLanguage('ar')).toBe('ar');
    expect(resolveLanguage('en')).toBe('en');
    expect(resolveLanguage('fr')).toBe('de');
    expect(resolveLanguage(null)).toBe('de');
  });
});