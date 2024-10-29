
import React from 'react';
import '../Alert.css'; // Make sure this file exists
const Alert = ({ message, type, onClose }) => {
    return (
        <div className={`alert ${type}`}>
            <span>{message}</span>
            <button className="close-btn" onClick={onClose}>X</button>
        </div>
    );
};

export default Alert;