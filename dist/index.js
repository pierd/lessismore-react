// src/components/LanguageSelector.tsx
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/components/LanguageSelector.css
styleInject(".language-selector {\n  position: fixed;\n  top: 1rem;\n  right: 1rem;\n  z-index: 100;\n}\n.lang-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.25rem;\n  height: 2.25rem;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.lang-btn:hover {\n  background: var(--bg-tertiary);\n}\n.lang-btn-current {\n  opacity: 1;\n}\n.language-dropdown {\n  position: absolute;\n  top: calc(100% + 0.25rem);\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md);\n  padding: 0.25rem;\n  animation: dropdownFadeIn 0.15s ease;\n}\n@keyframes dropdownFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-0.25rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.language-dropdown .lang-btn {\n  border: none;\n  opacity: 0.7;\n}\n.language-dropdown .lang-btn:hover {\n  opacity: 1;\n  background: var(--accent-glow);\n  box-shadow: 0 0 10px var(--accent-glow);\n}\n.lang-flag {\n  font-size: 1.25rem;\n  line-height: 1;\n}\n");

// src/components/LanguageSelector.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function LanguageSelector({
  languages,
  flags
}) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const currentLang = i18n.language?.substring(0, 2) || languages[0];
  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxs("div", { className: `language-selector ${isOpen ? "open" : ""}`, ref: containerRef, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: toggleOpen,
        className: "lang-btn lang-btn-current",
        title: t(`language.${currentLang}`),
        "aria-label": t(`language.${currentLang}`),
        "aria-expanded": isOpen,
        children: /* @__PURE__ */ jsx("span", { className: "lang-flag", children: flags[currentLang] })
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "language-dropdown", children: languages.filter((lang) => lang !== currentLang).map((lang) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleChange(lang),
        className: "lang-btn",
        title: t(`language.${lang}`),
        "aria-label": t(`language.${lang}`),
        children: /* @__PURE__ */ jsx("span", { className: "lang-flag", children: flags[lang] })
      },
      lang
    )) })
  ] });
}
export {
  LanguageSelector
};
//# sourceMappingURL=index.js.map