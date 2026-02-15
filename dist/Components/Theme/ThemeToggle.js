import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useSyncExternalStore } from "react";
const STORAGE_KEY = "theme";
const getSnapshot = () => {
    if (typeof document === "undefined")
        return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
};
const getServerSnapshot = () => "light";
const setTheme = (theme) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: theme }));
};
const subscribe = (callback) => {
    window.addEventListener("storage", callback);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const mediaHandler = (ev) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTheme(ev.matches ? "dark" : "light");
            callback();
        }
    };
    media.addEventListener("change", mediaHandler);
    return () => {
        window.removeEventListener("storage", callback);
        media.removeEventListener("change", mediaHandler);
    };
};
export function useTheme() {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
    };
    return { theme, toggleTheme };
}
export function ThemeToggleButton({ size }) {
    const { toggleTheme } = useTheme();
    return (_jsxs("button", { "aria-label": "Toggle theme", className: "inline-flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 p-1.5 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-transparent dark:text-white dark:hover:bg-white/10", type: "button", onClick: toggleTheme, children: [_jsx(MoonIcon, { className: "hidden dark:block", height: size ?? 18 }), _jsx(SunIcon, { className: "dark:hidden", height: size ?? 18 })] }));
}
//# sourceMappingURL=ThemeToggle.js.map