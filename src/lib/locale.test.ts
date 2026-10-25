import { describe, it as test } from 'node:test';
import { strict as assert } from 'node:assert';
import { getDirection, resolveLanguage, supportedLanguages } from './locale';

describe('portfolio languages', () => {
  test('supports German, English and Arabic', () => {
    assert.deepEqual([...supportedLanguages], ['de', 'en', 'ar']);
  });
  test('Arabic uses RTL', () => {
    assert.equal(getDirection('ar'), 'rtl');
  });
  test('German and English use LTR', () => {
    assert.equal(getDirection('de'), 'ltr');
    assert.equal(getDirection('en'), 'ltr');
  });
  test('restores Arabic and falls back to German for invalid stored languages', () => {
    assert.equal(resolveLanguage('ar'), 'ar');
    assert.equal(resolveLanguage('en'), 'en');
    assert.equal(resolveLanguage('fr'), 'de');
    assert.equal(resolveLanguage(null), 'de');
  });
});