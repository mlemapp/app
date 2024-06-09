import React from 'react';
import { twMerge } from 'tailwind-merge';

import { PolymorphicComponent, PolymorphicProps } from './types';

export const textVariants = ['h1', 'h2', 'h3', 'h4', 'headline', 'body', 'caption'] as const;

export type TextVariant = (typeof textVariants)[number];

export type TextOwnProps = {
    variant?: TextVariant;
};

export type TextProps<ElementType extends React.ElementType = 'p'> = PolymorphicProps<TextOwnProps, ElementType>;

const variantClassnames = {
    h1: 'text-3xl leading-snug font-bold text-text-primary',
    h2: 'text-2xl leading-snug font-bold text-text-primary',
    h3: 'text-xl leading-snug font-semibold text-text-primary',
    h4: 'text-lg leading-normal font-semibold text-text-primary',
    headline: 'text-md leading-normal font-medium text-text-primary',
    body: 'text-md leading-normal font-regular text-text-secondary',
    caption: 'text-sm leading-normal font-regular text-text-tertiary',
};

export const Text = React.forwardRef<Element, TextProps<React.ElementType>>(function Text(
    { variant = 'body', as: Component = 'span', children, className, ...others },
    ref,
) {
    return (
        <Component ref={ref} className={twMerge(variantClassnames[variant], className)} {...others}>
            {children}
        </Component>
    );
}) as PolymorphicComponent<'p', TextOwnProps>;
