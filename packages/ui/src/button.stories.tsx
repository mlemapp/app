import { Meta, StoryObj } from '@storybook/react';

import { Basket } from './icons';
import { Button, ButtonProps } from './button';

type StoryArgs = {
    size: ButtonProps['size'];
    variant: ButtonProps['variant'];
    label: string;
    disabled: boolean;
    pending: boolean;
    capsule: boolean;
    showIcon: boolean;
    iconOnly: boolean;
    pseudo: boolean;
};

const meta: Meta<StoryArgs> = {
    title: 'Button',
    argTypes: {
        variant: { table: { disable: true } },
        size: { options: ['small', 'medium'], control: { type: 'select' } },
        iconOnly: { if: { arg: 'showIcon' } },
    },
    args: {
        size: 'medium',
        disabled: false,
        pending: false,
        capsule: false,
        showIcon: false,
        iconOnly: false,
        pseudo: false,
    },

    render: ({ variant, label, disabled, pending, capsule, iconOnly, showIcon, pseudo, size }) => (
        <Button
            as={pseudo ? 'div' : 'button'}
            className={pseudo ? 'inline-flex' : ''}
            variant={variant}
            icon={showIcon ? Basket : undefined}
            label={label}
            disabled={disabled}
            pending={pending}
            capsule={capsule}
            iconOnly={iconOnly}
            size={size}
        />
    ),
};

export default meta;

export const Soft: StoryObj<StoryArgs> = {
    args: {
        label: 'Soft button',
        variant: 'soft',
    },
};

export const Danger: StoryObj<StoryArgs> = {
    args: {
        label: 'Danger button',
        variant: 'danger',
    },
};

export const Prominent: StoryObj<StoryArgs> = {
    args: {
        label: 'Prominent button',
        variant: 'prominent',
    },
};
