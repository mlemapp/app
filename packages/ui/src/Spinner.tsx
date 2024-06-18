import { css, keyframes } from '@emotion/react';
import { Spinner as PhSpinner } from '@phosphor-icons/react';

import tks from './tokens';

export type SpinnerProps = {
    size?: number;
    center?: boolean;
};

const spin = keyframes({
    from: {
        transform: 'rotate(0deg)',
    },

    to: {
        transform: 'rotate(360deg)',
    },
});

const rootStyles = {
    base: css({
        animation: `${spin} 1s linear infinite`,
        color: tks.colors.icon.default,
    }),

    center: css({
        margin: 'auto',
    }),
};

export default function Spinner({ size = 20, center }: SpinnerProps) {
    return <PhSpinner size={size} weight="bold" css={[rootStyles.base, center && rootStyles.center]} />;
}
