import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface LanguageSelectorProps<T extends string> {
  /** List of supported language codes */
  languages: readonly T[];
  /** Map of language codes to flag emojis */
  flags: Record<T, string>;
}

export function LanguageSelector<T extends string>({
  languages,
  flags,
}: LanguageSelectorProps<T>) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLang = (i18n.language?.substring(0, 2) || languages[0]) as T;

  const handleChange = (lang: T) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`language-selector ${isOpen ? 'open' : ''}`} ref={containerRef}>
      <button
        onClick={toggleOpen}
        className="lang-btn lang-btn-current"
        title={t(`language.${currentLang}`)}
        aria-label={t(`language.${currentLang}`)}
        aria-expanded={isOpen}
      >
        <span className="lang-flag">{flags[currentLang]}</span>
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {languages
            .filter((lang) => lang !== currentLang)
            .map((lang) => (
              <button
                key={lang}
                onClick={() => handleChange(lang)}
                className="lang-btn"
                title={t(`language.${lang}`)}
                aria-label={t(`language.${lang}`)}
              >
                <span className="lang-flag">{flags[lang]}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
