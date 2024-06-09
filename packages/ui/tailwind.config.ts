import { Config } from 'tailwindcss';

import { mlemUIPlugin } from './src/tailwind-plugin';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [mlemUIPlugin],
} satisfies Config;
