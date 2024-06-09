import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts({ rollupTypes: true })],
    build: {
        lib: {
            entry: [
                resolve(__dirname, 'src/index.ts'),
                resolve(__dirname, 'src/tailwind-plugin.ts'),
                resolve(__dirname, 'src/icons.ts'),
            ],
            formats: ['cjs', 'es'],
        },
        rollupOptions: {
            external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
        },
    },
});
