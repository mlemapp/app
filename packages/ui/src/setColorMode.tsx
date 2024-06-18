export type ColorMode = 'light' | 'dark' | 'system';

function toggleDarkMode(dark: boolean) {
    if (dark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function handleSystemModeChange(e: MediaQueryListEvent) {
    toggleDarkMode(e.matches);
}

const colorModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
let prevMode: ColorMode;

export default function setColorMode(mode: ColorMode) {
    if (prevMode === mode) {
        return;
    }

    if (prevMode === 'system') {
        colorModeMedia.removeEventListener('change', handleSystemModeChange);
    }

    if (mode !== 'system') {
        toggleDarkMode(mode === 'dark');
    } else {
        toggleDarkMode(colorModeMedia.matches);
        colorModeMedia.addEventListener('change', handleSystemModeChange);
    }

    prevMode = mode;
}
