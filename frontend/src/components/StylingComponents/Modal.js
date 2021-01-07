import React from 'react';
import ReactDom from 'react-dom';
import { Button } from 'react-bootstrap';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '221px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '30px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

const BUTTON_STYLES = {
    width: '150px',
    height: '40px',
    margin: '2px',
    padding: '1px'
}

export default function Modal({ open, children, onClose }) {
    if (!open) { return null }

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} onClick={onClose} />
            <div style={MODAL_STYLES}>
                {children}
                <Button variant="secondary" style={BUTTON_STYLES} onClick={onClose}>Close Menu</Button>
            </div>
        </>,
        document.getElementById('portal')
    )
}