import React from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { twMerge } from 'tailwind-merge';

import { PolymorphicComponent, PolymorphicProps } from './types';

export type OwnerState = {
    isActive: boolean;
};

export type PressableOwnProps = {
    className?: string | ((state: OwnerState) => string);
};

export type PressableProps<ElementType extends React.ElementType = 'button'> = PolymorphicProps<
    PressableOwnProps,
    ElementType
>;

export const Pressable = React.forwardRef<Element, PressableProps<React.ElementType>>(function Pressable(
    {
        as = 'button',
        type,
        children,
        disabled,
        className,
        style,
        tabIndex,
        onClick,
        onMouseDown,
        onKeyDown,
        onKeyUp,
        href,
        to,
        ...others
    },
    ref,
) {
    const [isActive, setIsActive] = React.useState(false);

    function handleOnMouseDown(e: React.MouseEvent<Element>) {
        onMouseDown?.(e);

        if (!disabled) {
            setIsActive(true);

            // Handle mouseup event like this instead of onMouseUp
            // This is because the user might move the mouse pointer outside the pressable area before mouse up,
            // which will cause onMouseUp to not fire

            document.addEventListener(
                'mouseup',
                () => {
                    setIsActive(false);
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

        setIsActive(true);

        if (as === 'button' || as === 'a' || href || to) {
            return;
        }

        e.preventDefault();
    }

    function handleOnKeyUp(e: React.KeyboardEvent<Element>) {
        onKeyUp?.(e);
        setIsActive(false);

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

    const animation = useSpring({
        from: { scale: 1 },
        to: { scale: isActive ? 0.95 : 1 },
        config: config.stiff,
    });

    const ownerState: OwnerState = {
        isActive,
    };

    const Component = React.useMemo(() => animated(as), [as]);

    return (
        <Component
            ref={ref}
            className={twMerge(
                'select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                !disabled ? 'cursor-pointer' : 'cursor-default',
                typeof className === 'function' ? className(ownerState) : className,
            )}
            style={{ ...animation, ...style }}
            onMouseDown={handleOnMouseDown}
            onClick={handleOnClick}
            onKeyDown={handleOnKeyDown}
            onKeyUp={handleOnKeyUp}
            {...buttonProps}
            {...others}
        >
            {children}
        </Component>
    );
}) as PolymorphicComponent<'button', PressableOwnProps>;
