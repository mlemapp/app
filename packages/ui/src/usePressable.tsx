import React from 'react';
import { css } from '@emotion/react';

import tks from './tokens';

export type UsePressableOptions = {
    as?: React.ElementType;
} & React.ComponentPropsWithRef<React.ElementType>;

const rootStyles = {
    base: css({
        userSelect: 'none',
        cursor: 'pointer',

        '&:focus-visible': {
            outlineStyle: 'solid',
            outlineWidth: 2,
            outlineOffset: tks.spaces[25],
            outlineColor: tks.colors.border.focused,
        },
    }),

    disabled: css({
        cursor: 'default',
    }),
};

export default function usePressable({
    as = 'button',
    type,
    disabled,
    tabIndex,
    onClick,
    onMouseDown,
    onKeyDown,
    onKeyUp,
    href,
    to,
    ref,
    ...others
}: UsePressableOptions) {
    const [active, setActive] = React.useState(false);

    function handleOnMouseDown(e: React.MouseEvent<Element>) {
        onMouseDown?.(e);

        if (!disabled) {
            setActive(true);

            // Handle mouseup event like this instead of onMouseUp
            // This is because the user might move the mouse pointer outside the pressable area before mouse up,
            // which will cause onMouseUp to not fire

            document.addEventListener(
                'mouseup',
                () => {
                    setActive(false);
                },
                { once: true },
            );
        }
    }

    function handleOnClick(e: React.MouseEvent<Element>) {
        if (!disabled) {
            onClick?.(e);
        }
    }

    function handleOnKeyDown(e: React.KeyboardEvent<Element>) {
        onKeyDown?.(e);

        if (disabled) {
            return;
        }

        if (e.key !== ' ' && e.key !== 'Enter') {
            return;
        }

        setActive(true);

        if (as === 'button' || as === 'a' || href || to) {
            return;
        }

        e.preventDefault();
    }

    function handleOnKeyUp(e: React.KeyboardEvent<Element>) {
        onKeyUp?.(e);
        setActive(false);

        if (disabled) {
            return;
        }

        if (as === 'button' || as === 'a' || href || to) {
            return;
        }

        onClick?.(e);
    }

    let buttonProps = {};

    if (as === 'button') {
        buttonProps = {
            type: type || 'button',
            disabled,
            tabIndex,
        };
    } else if (as === 'a' || href || to) {
        buttonProps = {
            href,
            to,
            'aria-disabled': disabled ? true : undefined,
            tabIndex: disabled ? -1 : tabIndex || 0,
        };
    } else {
        buttonProps = {
            role: 'button',
            'aria-disabled': disabled ? true : undefined,
            tabIndex: disabled ? -1 : tabIndex || 0,
        };
    }

    return {
        active,
        baseStyles: [rootStyles.base, disabled && rootStyles.disabled],
        pressableProps: {
            ref,
            onClick: handleOnClick,
            onMouseDown: handleOnMouseDown,
            onKeyDown: handleOnKeyDown,
            onKeyUp: handleOnKeyUp,
            ...buttonProps,
            ...others,
        },
    };
}
