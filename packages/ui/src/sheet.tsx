import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { useTransition, animated } from '@react-spring/web';

import { X } from './icons';
import { Button } from './button';
import { theme } from './theme';

export type SheetProps = {
    open: boolean;
    onClose: () => void;
    titleId?: string;
    descriptionId?: string;
    children: React.ReactNode;
};

function isAriaHideable(target: Element) {
    const forbiddenTagNames = [
        'TEMPLATE',
        'SCRIPT',
        'STYLE',
        'LINK',
        'MAP',
        'META',
        'NOSCRIPT',
        'PICTURE',
        'COL',
        'COLGROUP',
        'PARAM',
        'SLOT',
        'SOURCE',
        'TRACK',
    ];

    const isForbiddenTagName = forbiddenTagNames.indexOf(target.tagName) !== -1;
    const isInputHidden = target.tagName === 'INPUT' && target.getAttribute('type') === 'hidden';

    return !isForbiddenTagName && !isInputHidden;
}

function ariaHideOthers(target: Element) {
    if (target === document.body) {
        return;
    }

    while (true) {
        const siblings = target.parentElement!.children;

        for (const sibling of siblings) {
            if (sibling === target) {
                continue;
            }

            if (isAriaHideable(sibling)) {
                sibling.setAttribute('aria-hidden', 'true');
            }
        }

        if (target.parentElement === document.body) {
            return;
        }

        target = target.parentElement!;
    }
}

function removeAriaHide() {
    const children = document.body.children;

    for (const child of children) {
        if (child.getAttribute('aria-hidden')) {
            child.removeAttribute('aria-hidden');
        }
    }
}

export function Sheet({ open, onClose, titleId, descriptionId, children }: SheetProps) {
    const sheetId = React.useId();
    const sheetSelector = `#${CSS.escape(sheetId)}`;

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target !== e.currentTarget) {
            return;
        }

        onClose();
    }

    React.useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = 'hidden';
            ariaHideOthers(document.querySelector(sheetSelector)!);
        }

        return () => {
            document.documentElement.style.removeProperty('overflow');
            removeAriaHide();
        };
    }, [open, sheetSelector]);

    const transition = useTransition(open, {
        from: { progress: 0 },
        enter: { progress: 1 },
        leave: { progress: 0 },
    });

    return ReactDOM.createPortal(
        transition((animation, transitionOpen) =>
            transitionOpen ? (
                <React.Fragment>
                    <animated.div
                        className="fixed inset-0"
                        style={{
                            backgroundColor: animation.progress.to({
                                output: [theme.colors.transparent, theme.colors.backdrop],
                            }),
                            backdropFilter: animation.progress.to({ output: ['blur(0px)', 'blur(20px)'] }),
                        }}
                    />
                    <animated.div
                        className="fixed inset-0 flex flex-col sm:py-10 overflow-auto"
                        onClick={handleClickOutside}
                        style={{
                            transform: animation.progress.to({ output: ['translateY(100%)', 'translateY(0%)'] }),
                        }}
                    >
                        <FocusTrap
                            focusTrapOptions={{
                                initialFocus: sheetSelector,
                                fallbackFocus: sheetSelector,
                                clickOutsideDeactivates: true,
                                preventScroll: true,
                            }}
                        >
                            <div
                                tabIndex={-1}
                                id={sheetId}
                                role="dialog"
                                aria-modal
                                aria-labelledby={titleId}
                                aria-describedby={descriptionId}
                                onKeyDown={handleKeyDown}
                                className="m-auto outline-none relative bg-surface-elevated flex flex-col w-full flex-1 px-4 py-8 sm:max-w-lg sm:rounded-xl sm:flex-initial"
                            >
                                <div className="absolute top-4 right-4">
                                    <Button
                                        className="text-text-secondary"
                                        label="Close"
                                        icon={X}
                                        variant="soft"
                                        size="small"
                                        capsule
                                        iconOnly
                                        onClick={onClose}
                                    />
                                </div>
                                {children}
                            </div>
                        </FocusTrap>
                    </animated.div>
                </React.Fragment>
            ) : null,
        ),
        document.body,
    );
}
