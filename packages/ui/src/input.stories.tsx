import { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

type StoryArgs = {
    placeholder: string;
    disabled: boolean;
    error: boolean;
    showStartDecorator: boolean;
    showEndDecorator: boolean;
};

const meta: Meta = {
    title: 'Inputs',
};

export default meta;

export const BasicInput: StoryObj<StoryArgs> = {
    args: {
        error: false,
        disabled: false,
        placeholder: 'Placeholder',
        showStartDecorator: false,
        showEndDecorator: false,
    },

    render: ({ placeholder, error, disabled, showStartDecorator, showEndDecorator }) => (
        <Input
            className="w-60"
            error={error}
            disabled={disabled}
            placeholder={placeholder}
            startDecorator={showStartDecorator && '$'}
            endDecorator={showEndDecorator && '.00'}
        />
    ),
};
