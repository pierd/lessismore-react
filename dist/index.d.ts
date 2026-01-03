import * as react_jsx_runtime from 'react/jsx-runtime';

interface LanguageSelectorProps<T extends string> {
    /** List of supported language codes */
    languages: readonly T[];
    /** Map of language codes to flag emojis */
    flags: Record<T, string>;
}
declare function LanguageSelector<T extends string>({ languages, flags, }: LanguageSelectorProps<T>): react_jsx_runtime.JSX.Element;

export { LanguageSelector, type LanguageSelectorProps };
