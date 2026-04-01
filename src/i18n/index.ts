import { useApp } from "../context/AppContext";
import en from "./en";
import ko from "./ko";
import type { Language, TranslationKey, Translations } from "./types";

export type { Language, TranslationKey };

const TRANSLATIONS: Record<Language, Translations> = { en, ko } as const;

type InterpolationParams = Record<string, string | number>;

function interpolate(template: string, params?: InterpolationParams): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function useTranslation() {
  const { state } = useApp();
  const translations = TRANSLATIONS[state.language];

  function t(key: TranslationKey, params?: InterpolationParams): string {
    return interpolate(translations[key], params);
  }

  return { t, language: state.language };
}
