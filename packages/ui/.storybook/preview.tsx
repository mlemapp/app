import React from 'react';
import { Preview } from '@storybook/react';

import { ColorSchemeProvider, useColorScheme } from '../src/color-scheme';

import './main.css';
import '../src/main.css';

function ColorSchemeSetter({ globals }: { globals: any }) {
    const [, setColorScheme] = useColorScheme();

    React.useEffect(() => {
        setColorScheme(globals.colorScheme);
    }, [globals.colorScheme]);

    return null;
}

const preview: Preview = {
    decorators: [
        (Story, { globals }) => (
            <ColorSchemeProvider>
                <ColorSchemeSetter globals={globals} />
                <Story />
            </ColorSchemeProvider>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    globalTypes: {
        colorScheme: {
            description: 'Color scheme for components',
            toolbar: {
                title: 'Color scheme',
                items: [
                    { value: 'light', icon: 'sun', title: 'Light' },
                    { value: 'dark', icon: 'moon', title: 'Dark' },
                ],
                dynamicTitle: true,
            },
        },
    },
    globals: {
        colorScheme: 'light',
    },
};

export default preview;
