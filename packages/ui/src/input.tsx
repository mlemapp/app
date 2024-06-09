import React from 'react';
import { twMerge } from 'tailwind-merge';

export type InputProps = React.ComponentPropsWithRef<'input'> & {
    startDecorator?: React.ReactNode;
    endDecorator?: React.ReactNode;
    error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    { disabled, startDecorator, endDecorator, className, error, onFocus, onBlur, ...others },
    ref,
) {
    const [focused, setFocused] = React.useState(false);

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        onFocus?.(e);
        setFocused(true);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        onBlur?.(e);
        setFocused(false);
    }

    const isError = !focused && error;

    return (
        <div
            className={twMerge(
                'flex items-center gap-4 py-2 px-4 rounded-sm focus-within:outline focus-within:outline-2 focus-within:outline-accent',
                disabled ? 'text-text-disabled' : 'text-text-secondary',
                isError ? 'bg-fill-red' : 'bg-fill',
                className,
            )}
        >
            {startDecorator && <div>{startDecorator}</div>}
            <input
                ref={ref}
                type="text"
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-invalid={error}
                className={`bg-transparent min-w-0 flex-1 outline-none ${
                    disabled ? 'placeholder-text-disabled' : 'placeholder-text-tertiary'
                }`}
                {...others}
            />
            {endDecorator && <div>{endDecorator}</div>}
        </div>
    );
});
