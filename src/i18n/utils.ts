import { ui, defaultLang } from "./ui";

export type Lang = "de" | "en";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(currentPath: string, targetLang: Lang): string {
  const segments = currentPath.split("/").filter(Boolean);
  if (segments.length === 0) return `/${targetLang}/`;
  if (segments[0] in ui) {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }
  const trailing = currentPath.endsWith("/") ? "/" : "";
  return "/" + segments.join("/") + trailing;
}
