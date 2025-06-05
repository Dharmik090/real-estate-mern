import React from 'react';
import '../static/Title.css';

const Title = ({ title, description }) => {
  return (
    <div className="title-container">
      <div className="title-divider">
        <span className="title-tag">{title}</span>
      </div>
      <p className="section-description">{description}</p>
    </div>
  );
};

export default Title;