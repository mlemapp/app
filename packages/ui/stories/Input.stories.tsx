import { Meta, StoryObj } from '@storybook/react';

import { Input as UIInput, InputProps } from '../src';

type StoryArgs = InputProps & {
    showStartDecorator: boolean;
    showEndDecorator: boolean;
};

const meta: Meta = {};

export default meta;

export const Input: StoryObj<StoryArgs> = {
    argTypes: {
        size: { options: ['small', 'medium', 'large'], control: { type: 'radio' } },
    },

    args: {
        size: 'medium',
        disabled: false,
        error: false,
        placeholder: 'Placeholder',
        showStartDecorator: false,
        showEndDecorator: false,
    },

    render: ({ placeholder, disabled, showStartDecorator, showEndDecorator, size, error }) => (
        <UIInput
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            error={error}
            startDecorator={showStartDecorator && '$'}
            endDecorator={showEndDecorator && '.00'}
        />
    ),
};
