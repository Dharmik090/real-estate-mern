import React from 'react';
import '../static/ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message, title, btnText, isProcessing }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog">
            <div className="confirm-dialog-content">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="confirm-dialog-actions">
                    <button
                        onClick={onConfirm}
                        className="btn btn-danger"
                        disabled={isProcessing}
                    >
                        {isProcessing && <span className="spinner-border spinner-border-sm me-2"></span>}
                        {btnText}
                    </button>
                    <button className="btn btn-secondary m-1" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
