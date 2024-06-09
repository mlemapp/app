import React from 'react';

export type ColorScheme = 'light' | 'dark' | 'automatic';
export type ColorSchemeContextValue = [ColorScheme, (value: ColorScheme) => void];

export type ColorSchemeProviderProps = {
    children: React.ReactNode;
};

const ColorSchemeContext = React.createContext<ColorSchemeContextValue | null>(null);

function applyDarkModeClass({ matches }: { matches: boolean }) {
    if (matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

export function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
    const [colorScheme, setColorScheme] = React.useState<ColorScheme>('automatic');

    React.useEffect(() => {
        if (colorScheme !== 'automatic') {
            applyDarkModeClass({ matches: colorScheme === 'dark' });
            return;
        }

        const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');

        applyDarkModeClass(colorSchemeMedia);
        colorSchemeMedia.addEventListener('change', applyDarkModeClass);

        return () => colorSchemeMedia.removeEventListener('change', applyDarkModeClass);
    }, [colorScheme]);

    return <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>{children}</ColorSchemeContext.Provider>;
}

export function useColorScheme() {
    const ctx = React.useContext(ColorSchemeContext);

    if (!ctx) {
        throw new Error('useColorScheme() must be called within <ColorSchemeProvider />');
    }

    return ctx;
}
