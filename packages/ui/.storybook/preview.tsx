import React from 'react';
import { Preview } from '@storybook/react';

import { setColorMode } from '../src';

import '../src/main.css';

function ColorModeSetter({ globals }: { globals: any }) {
    React.useEffect(() => {
        setColorMode(globals.colorScheme);
    }, [globals.colorScheme]);

    return null;
}

const preview: Preview = {
    decorators: [
        (Story, { globals }) => (
            <React.Fragment>
                <ColorModeSetter globals={globals} />
                <Story />
            </React.Fragment>
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
