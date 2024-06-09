import { Config } from 'tailwindcss';
import { mlemUIPlugin } from '@mlemapp/ui/tailwind-plugin';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@mlemapp/ui/dist/**/*.{js,ts,jsx,tsx}'],
    plugins: [mlemUIPlugin],
} satisfies Config;
