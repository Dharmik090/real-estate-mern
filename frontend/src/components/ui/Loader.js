import React from 'react';
import '../../static/Loader.css'; // We'll create this next

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader-spinner"></div>
            <div className="loader-text">Loading...</div>
        </div>
    );
};

export default Loader;