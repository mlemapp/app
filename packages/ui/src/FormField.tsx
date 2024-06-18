import React from 'react';
import { css } from '@emotion/react';

import Input from './Input';
import tks from './tokens';
import { OverrideProps } from './types';

export type FormFieldProps = OverrideProps<
    {
        error?: boolean;
        helperText?: string;
        label: string;
    },
    typeof Input
>;

const rootStyles = {
    base: css({
        display: 'flex',
        flexDirection: 'column',
        gap: tks.spaces[100],
    }),

    small: css({
        gap: tks.spaces[50],
    }),
};

const labelStyles = {
    base: css({
        userSelect: 'none',
        color: tks.colors.text.subtle,
        lineHeight: tks.lineHeights.normal,
    }),

    small: css({
        fontSize: tks.fontSizes.sm,
    }),
};

const helperStyles = {
    base: css({
        userSelect: 'none',
        color: tks.colors.text.subtler,
        fontSize: tks.fontSizes.sm,
        lineHeight: tks.lineHeights.normal,
    }),

    small: css({
        fontSize: tks.fontSizes.xs,
    }),

    error: css({
        color: tks.colors.text.danger,
    }),
};

export default React.forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
    { helperText, className, error, size, label, ...others },
    ref,
) {
    const inputId = React.useId();
    const labelId = `${inputId}-label`;
    const helperTextId = `${inputId}-helper`;

    return (
        <div css={[rootStyles.base, size === 'small' && rootStyles.small]} className={className}>
            <label css={[labelStyles.base, size === 'small' && labelStyles.small]} htmlFor={inputId} id={labelId}>
                {label}
            </label>
            <Input
                aria-invalid={error}
                error={error}
                aria-describedby={helperTextId}
                aria-labelledby={labelId}
                size={size}
                ref={ref}
                {...others}
            />
            {helperText && (
                <div
                    id={helperTextId}
                    css={[helperStyles.base, size === 'small' && helperStyles.small, error && helperStyles.error]}
                >
                    {helperText}
                </div>
            )}
        </div>
    );
});
