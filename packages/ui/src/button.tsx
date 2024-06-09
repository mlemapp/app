import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon as IconComponent, CircleNotch } from './icons';
import { Pressable } from './pressable';
import { PolymorphicComponent, PolymorphicProps } from './types';

// Styled button

export type ButtonOwnProps = {
    icon?: IconComponent;
    label: string;
    iconOnly?: boolean;
    capsule?: boolean;
    disabled?: boolean;
    pending?: boolean;
    variant?: 'soft' | 'danger' | 'prominent';
    size?: 'small' | 'medium';
};

export type ButtonProps<ElementType extends React.ElementType = 'button'> = PolymorphicProps<
    ButtonOwnProps,
    ElementType
>;

export const Button = React.forwardRef<Element, ButtonProps<React.ElementType>>(function Button(
    {
        as = 'button',
        label,
        icon: Icon,
        iconOnly,
        variant = 'soft',
        className,
        capsule,
        size = 'medium',
        disabled,
        pending,
        ...others
    },
    ref,
) {
    const isDisabled = pending || disabled;

    return (
        <Pressable
            as={as}
            ref={ref}
            disabled={isDisabled}
            className={({ isActive }) =>
                twMerge(
                    // Base style

                    'flex items-center justify-center gap-2 font-medium',

                    // Text size

                    size === 'small' && 'text-sm',

                    // Padding

                    size === 'small' && (iconOnly ? 'p-1.5' : 'px-3 py-1.5'),
                    size === 'medium' && (iconOnly ? 'p-2' : 'px-4 py-2'),

                    // Border radius

                    capsule ? 'rounded-full' : size === 'small' ? 'rounded-xs' : 'rounded-sm',

                    // Disabled style

                    isDisabled && 'bg-fill text-text-disabled',

                    // Soft/Danger variant style

                    (variant === 'soft' || variant === 'danger') &&
                        !isDisabled &&
                        (isActive ? 'bg-fill-dark' : 'bg-fill hover:bg-fill-dark'),

                    variant === 'soft' && !isDisabled && 'text-accent',
                    variant === 'danger' && !isDisabled && 'text-red',

                    // Prominent variant style

                    variant === 'prominent' &&
                        !isDisabled &&
                        (isActive ? 'bg-accent-dark' : 'bg-accent hover:bg-accent-dark'),

                    variant === 'prominent' && !isDisabled && 'text-white',

                    className,
                )
            }
            aria-label={iconOnly ? label : undefined}
            {...others}
        >
            {pending ? (
                <CircleNotch size={16} weight="bold" className="text-accent animate-spin" />
            ) : (
                Icon && <Icon size={16} weight="bold" />
            )}
            {!iconOnly && label}
        </Pressable>
    );
}) as PolymorphicComponent<'button', ButtonOwnProps>;
