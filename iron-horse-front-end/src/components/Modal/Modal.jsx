import { useCallback } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    const closeOnOverlayClick = useCallback((e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeOnOverlayClick}>
            <div className="modal-content container" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;