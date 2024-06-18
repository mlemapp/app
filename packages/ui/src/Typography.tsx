import React from 'react';
import { css } from '@emotion/react';

import tks from './tokens';
import { PolymorphicComponent, PolymorphicProps } from './types';

export const typographyVariants = ['h1', 'h2', 'h3', 'h4', 'headline', 'body', 'caption'] as const;

export type TypographyVariant = (typeof typographyVariants)[number];

export type TypographyOwnProps = {
    variant?: TypographyVariant;
};

export type TypographyProps<ElementType extends React.ElementType = 'p'> = PolymorphicProps<
    TypographyOwnProps,
    ElementType
>;

const rootStyles = {
    h1: css({
        fontSize: tks.fontSizes['3xl'],
        lineHeight: tks.lineHeights.snug,
        fontWeight: tks.fontWeights.bold,
        color: tks.colors.text.default,
    }),

    h2: css({
        fontSize: tks.fontSizes['2xl'],
        lineHeight: tks.lineHeights.snug,
        fontWeight: tks.fontWeights.bold,
        color: tks.colors.text.default,
    }),

    h3: css({
        fontSize: tks.fontSizes.xl,
        lineHeight: tks.lineHeights.snug,
        fontWeight: tks.fontWeights.semibold,
        color: tks.colors.text.default,
    }),

    h4: css({
        fontSize: tks.fontSizes.lg,
        lineHeight: tks.lineHeights.normal,
        fontWeight: tks.fontWeights.semibold,
        color: tks.colors.text.default,
    }),

    headline: css({
        fontSize: tks.fontSizes.md,
        lineHeight: tks.lineHeights.normal,
        fontWeight: tks.fontWeights.medium,
        color: tks.colors.text.default,
    }),

    body: css({
        fontSize: tks.fontSizes.md,
        lineHeight: tks.lineHeights.normal,
        fontWeight: tks.fontWeights.regular,
        color: tks.colors.text.default,
    }),

    caption: css({
        fontSize: tks.fontSizes.sm,
        lineHeight: tks.lineHeights.normal,
        fontWeight: tks.fontWeights.regular,
        color: tks.colors.text.subtle,
    }),
};

export default React.forwardRef<Element, TypographyProps<React.ElementType>>(function Typography(
    { variant = 'body', as: Component = 'span', children, ...others },
    ref,
) {
    return (
        <Component ref={ref} css={rootStyles[variant]} {...others}>
            {children}
        </Component>
    );
}) as PolymorphicComponent<'p', TypographyOwnProps>;
