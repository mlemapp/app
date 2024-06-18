import React from 'react';
import { css } from '@emotion/react';
import { Icon as IconComponent } from '@phosphor-icons/react';

import Spinner from './Spinner';
import usePressable from './usePressable';
import tks from './tokens';
import { PolymorphicComponent, PolymorphicProps } from './types';

// Styled button

export type ButtonOwnProps = {
    label: string;
    icon?: IconComponent;
    iconOnly?: boolean;
    capsule?: boolean;
    disabled?: boolean;
    pending?: boolean;
    variant?: 'default' | 'danger' | 'prominent';
    size?: 'small' | 'medium' | 'large';
    to?: string | object;
    href?: string;
};

export type ButtonProps<ElementType extends React.ElementType = 'button'> = PolymorphicProps<
    ButtonOwnProps,
    ElementType
>;

const rootStyles = {
    base: css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tks.spaces[100],
        fontWeight: tks.fontWeights.medium,
        borderRadius: tks.borderRadii.md,
        transition: 'background 0.1s ease-out',
    }),

    small: css({
        borderRadius: tks.borderRadii.sm,
        fontSize: tks.fontSizes.sm,
        paddingInline: tks.spaces[150],
        height: '2rem',
    }),

    smallIcon: css({
        paddingInline: tks.spaces[100],
    }),

    medium: css({
        height: '2.25rem',
        paddingInline: tks.spaces[200],
    }),

    mediumIcon: css({
        paddingInline: tks.spaces[100],
    }),

    large: css({
        height: '2.5rem',
        paddingInline: tks.spaces[200],
    }),

    largeIcon: css({
        padding: tks.spaces[125],
    }),

    capsule: css({
        borderRadius: tks.borderRadii.full,
    }),

    disabled: css({
        backgroundColor: tks.colors.bg.disabled,
    }),

    default: css({
        backgroundColor: tks.colors.bg.neutral.default,

        '&:hover': {
            backgroundColor: tks.colors.bg.neutral.hovered,
        },
    }),

    defaultActive: css({
        '&&': {
            backgroundColor: tks.colors.bg.neutral.active,
        },
    }),

    danger: css({
        backgroundColor: tks.colors.bg.danger.default,

        '&:hover': {
            backgroundColor: tks.colors.bg.danger.hovered,
        },
    }),

    dangerActive: css({
        '&&': {
            backgroundColor: tks.colors.bg.danger.active,
        },
    }),

    prominent: css({
        backgroundColor: tks.colors.bg.brand.default,

        '&:hover': {
            backgroundColor: tks.colors.bg.brand.hovered,
        },
    }),

    prominentActive: css({
        '&&': {
            backgroundColor: tks.colors.bg.brand.active,
        },
    }),
};

const labelStyles = {
    base: css({
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flex: 1,
    }),

    default: css({
        color: tks.colors.text.default,
    }),

    danger: css({
        color: tks.colors.text.inverse,
    }),

    prominent: css({
        color: tks.colors.text.inverse,
    }),

    disabled: css({
        color: tks.colors.text.disabled,
    }),

    pending: css({
        color: tks.colors.transparent,
    }),
};

const iconStyles = {
    default: css({
        color: tks.colors.icon.default,
    }),

    danger: css({
        color: tks.colors.icon.inverse,
    }),

    prominent: css({
        color: tks.colors.icon.inverse,
    }),

    disabled: css({
        color: tks.colors.icon.disabled,
    }),

    pending: css({
        color: tks.colors.transparent,
    }),
};

const spinnerContainerStyles = {
    base: css({
        position: 'absolute',
        inset: 0,
        display: 'flex',
    }),
};

export default React.forwardRef<Element, ButtonProps<React.ElementType>>(function Button(
    {
        as: Component = 'button',
        label,
        icon: Icon,
        iconOnly,
        variant = 'default',
        capsule,
        size = 'medium',
        pending,
        disabled,
        ...others
    },
    ref,
) {
    const isDisabled = disabled || pending;
    const { active, baseStyles, pressableProps } = usePressable({ as: Component, disabled, ref, ...others });

    return (
        <Component
            css={[
                ...baseStyles,
                rootStyles.base,
                rootStyles[size],
                iconOnly && rootStyles[`${size}Icon`],
                capsule && rootStyles.capsule,
                isDisabled ? rootStyles.disabled : rootStyles[variant],
                active && rootStyles[`${variant}Active`],
            ]}
            aria-label={iconOnly ? label : undefined}
            {...pressableProps}
        >
            {pending && (
                <span css={spinnerContainerStyles.base}>
                    <Spinner center />
                </span>
            )}
            {Icon && (
                <Icon
                    size={size === 'small' ? 16 : 20}
                    weight="bold"
                    css={[iconStyles[variant], disabled && iconStyles.disabled, pending && iconStyles.pending]}
                />
            )}
            {!iconOnly && (
                <span
                    css={[
                        labelStyles.base,
                        labelStyles[variant],
                        disabled && labelStyles.disabled,
                        pending && labelStyles.pending,
                    ]}
                >
                    {label}
                </span>
            )}
        </Component>
    );
}) as PolymorphicComponent<'button', ButtonOwnProps>;
