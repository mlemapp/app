import React from 'react';
import { css } from '@emotion/react';

import tks from './tokens';
import { OverrideProps } from './types';

export type InputProps = OverrideProps<
    {
        error?: boolean;
        disabled?: boolean;
        startDecorator?: React.ReactNode;
        endDecorator?: React.ReactNode;
        size?: 'small' | 'medium' | 'large';
    },
    'input'
>;

const rootStyles = {
    base: css({
        display: 'flex',
        alignItems: 'center',
        gap: tks.spaces[150],
        backgroundColor: tks.colors.bg.input.default,
        borderColor: tks.colors.border.input,
        borderWidth: 1,
        borderRadius: tks.borderRadii.md,
        color: tks.colors.text.default,
        transition: 'background 0.1s ease-out',

        '&:focus-within': {
            backgroundColor: tks.colors.bg.input.active,
            borderColor: tks.colors.transparent,
            outlineStyle: 'solid',
            outlineWidth: 2,
            outlineColor: tks.colors.border.focused,
        },
    }),

    small: css({
        borderRadius: tks.borderRadii.sm,
        fontSize: tks.fontSizes.sm,
        gap: tks.spaces[100],
        paddingInline: tks.spaces[150],
        paddingBlock: tks.spaces[75],
    }),

    medium: css({
        paddingInline: tks.spaces[200],
        paddingBlock: tks.spaces[100],
    }),

    large: css({
        paddingInline: tks.spaces[200],
        paddingBlock: tks.spaces[150],
    }),

    error: css({
        borderColor: tks.colors.border.danger,
    }),

    disabled: css({
        backgroundColor: tks.colors.bg.disabled,
        color: tks.colors.text.disabled,
        borderColor: tks.colors.border.disabled,
    }),

    nonDisabled: css({
        '&:hover': {
            backgroundColor: tks.colors.bg.input.hovered,
        },
    }),
};

const inputStyles = {
    base: css({
        flex: 1,
        backgroundColor: tks.colors.transparent,
        outline: 'none',
        minWidth: 0,

        '&::placeholder': {
            color: tks.colors.text.subtler,
        },
    }),

    disabled: css({
        '&::placeholder': {
            color: tks.colors.text.disabled,
        },
    }),
};

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
    { disabled, error, startDecorator, endDecorator, className, size = 'medium', ...others },
    ref,
) {
    return (
        <div
            css={[
                rootStyles.base,
                rootStyles[size],
                error && rootStyles.error,
                disabled ? rootStyles.disabled : rootStyles.nonDisabled,
            ]}
            className={className}
        >
            {startDecorator && <div>{startDecorator}</div>}
            <input
                ref={ref}
                type="text"
                disabled={disabled}
                css={[inputStyles.base, disabled && inputStyles.disabled]}
                {...others}
            />
            {endDecorator && <div>{endDecorator}</div>}
        </div>
    );
});
