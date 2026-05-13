import { useState, useEffect } from 'react';

export type Lang = 'es' | 'en';
const STORAGE_KEY = 'portfolio-lang';
const EVENT_NAME = 'portfolio:langchange';

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    // Read from localStorage on mount
    const stored = (localStorage.getItem(STORAGE_KEY) as Lang) || 'es';
    setLangState(stored);
    document.documentElement.classList.toggle('lang-en', stored === 'en');

    // Listen for changes dispatched by other components
    const handler = (e: Event) => {
      const newLang = (e as CustomEvent<{ lang: Lang }>).detail.lang;
      setLangState(newLang);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.classList.toggle('lang-en', newLang === 'en');
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { lang: newLang } }));
  };

  return { lang, setLang };
}
