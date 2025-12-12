// src/components/Footer.jsx
import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import useTheme from '../hooks/useTheme';

export default function Footer() {
  const { selectedLanguage, setSelectedLanguage, t } = useTranslation();
  const { theme, toggle } = useTheme();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  ];
  return (
    <footer className="bg-linear-to-r from-emerald-900 to-teal-900 text-white py-12 px-4 sm:px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="space-y-2">
          <h3 className="font-bold mb-4 text-lg bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{t('company')}</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="hover:text-emerald-300 cursor-pointer transition">{t('about')}</li>
            <li className="hover:text-emerald-300 cursor-pointer transition">{t('contact')}</li>
            <li className="hover:text-emerald-300 cursor-pointer transition">{t('privacy')}</li>
            <li className="hover:text-emerald-300 cursor-pointer transition">{t('terms')}</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold mb-4 text-lg bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{t('contactHeading')}</h3>
          <a 
            href="mailto:contactrubiesthrift@gmail.com"
            className="text-sm sm:text-base text-gray-300 hover:text-emerald-300 hover:underline transition"
          >
            {t('email')}
          </a>
          <a 
            href="tel:+2349032217418"
            className="text-sm sm:text-base text-gray-300 hover:text-emerald-300 hover:underline transition block"
          >
            {t('phone')}
          </a>
          <p className="text-xs sm:text-sm text-gray-400">RubiesThrift</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold mb-4 text-lg bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{t('language')}</h3>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full sm:w-auto bg-slate-700 text-white px-3 py-2 rounded border border-emerald-500 hover:border-emerald-400 cursor-pointer transition text-sm sm:text-base"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            {t('current')}: {languages.find(l => l.code === selectedLanguage)?.name}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={toggle}
              className="px-3 py-2 bg-slate-700 text-white rounded border border-emerald-500 hover:border-emerald-400 transition text-sm sm:text-base flex items-center gap-2"
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? t('lightMode') : t('darkMode')}
            </button>
            <p className="text-xs text-gray-400">{t('themeToggleDesc')}</p>
          </div>
        </div>
      </div>
      <hr className="border-slate-700 my-6" />
      <p className="text-center text-sm sm:text-base text-gray-400">{t('copyright')}</p>
    </footer>
  );
}
