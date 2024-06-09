import plugin from 'tailwindcss/plugin';

import { theme } from './theme';

export const mlemUIPlugin = plugin(() => {}, {
    darkMode: ['selector'],
    theme,
});
