import React from 'react';
import '../ConfirmDialog.css'; 

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message, title, btnText }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog">
            <div className="confirm-dialog-content">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="confirm-dialog-actions">
                    <button className="btn btn-danger m-1" onClick={onConfirm}>{btnText}</button>
                    <button className="btn btn-secondary m-1" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
