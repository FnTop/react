import React from 'react';
import { Link } from 'react-router-dom';
import './ToolCard.css';

const ToolCard = ({ tool }) => {
  return (
    <Link to={`/tool/${tool.id}`} className="tool-card">
      <div className="tool-icon">
        <img src={tool.icon} alt={tool.name} />
      </div>
      <div className="tool-info">
        <h3 className="tool-name">{tool.name}</h3>
        <p className="tool-description">{tool.description}</p>
      </div>
    </Link>
  );
};

export default ToolCard; 