import React from 'react';
import ReactDOM from 'react-dom';

export type PortalProps = {
    children: React.ReactNode;
};

export default function Portal({ children }: PortalProps) {
    return ReactDOM.createPortal(children, document.body);
}
