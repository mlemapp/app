import { Meta, StoryObj } from '@storybook/react';

import { FormField as UIFormField, FormFieldProps } from '../src';

type StoryArgs = FormFieldProps & {
    showStartDecorator: boolean;
    showEndDecorator: boolean;
};

const meta: Meta = {};

export default meta;

export const FormField: StoryObj<StoryArgs> = {
    argTypes: {
        size: { options: ['small', 'medium', 'large'], control: { type: 'radio' } },
    },

    args: {
        label: 'Label',
        size: 'medium',
        disabled: false,
        error: false,
        placeholder: 'Placeholder',
        helperText: 'Helper text',
        showStartDecorator: false,
        showEndDecorator: false,
    },

    render: ({ label, placeholder, helperText, disabled, error, showStartDecorator, showEndDecorator, size }) => (
        <UIFormField
            label={label}
            disabled={disabled}
            error={error}
            placeholder={placeholder}
            helperText={helperText}
            size={size}
            startDecorator={showStartDecorator && '$'}
            endDecorator={showEndDecorator && '.00'}
        />
    ),
};
