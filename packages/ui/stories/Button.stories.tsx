import { Meta, StoryObj } from '@storybook/react';
import { Basket, Check, Trash } from '@phosphor-icons/react';

import { Button, ButtonProps } from '../src';

type StoryArgs = ButtonProps & {
    showIcon: boolean;
    pseudo: boolean;
};

const meta: Meta<StoryArgs> = {
    argTypes: {
        variant: { table: { disable: true } },
        icon: { table: { disable: true } },
        size: { options: ['small', 'medium', 'large'], control: { type: 'radio' } },
        iconOnly: { if: { arg: 'showIcon' } },
    },
    args: {
        size: 'medium',
        capsule: false,
        showIcon: false,
        iconOnly: false,
        pseudo: false,
        disabled: false,
        pending: false,
    },

    render: ({ variant, label, capsule, iconOnly, icon, showIcon, pseudo, size, disabled, pending }) => (
        <Button
            as={pseudo ? 'div' : 'button'}
            className={pseudo ? 'inline-flex' : ''}
            variant={variant}
            icon={showIcon ? icon : undefined}
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

export const Default: StoryObj<StoryArgs> = {
    args: {
        label: 'Apply settings',
        icon: Check,
        variant: 'default',
    },
};

export const Danger: StoryObj<StoryArgs> = {
    args: {
        label: 'Delete menu',
        icon: Trash,
        variant: 'danger',
    },
};

export const Prominent: StoryObj<StoryArgs> = {
    args: {
        label: 'Add to cart',
        icon: Basket,
        variant: 'prominent',
    },
};
