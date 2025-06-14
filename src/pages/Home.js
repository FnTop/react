import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Home.css';

const toolsData = [
  {
    id: 'pinyinQuiz',
    nameKey: 'pinyinQuiz',
    descriptionKey: 'pinyinQuizDesc',
    icon: 'https://placehold.co/60x60/795548/ffffff?text=PQ',
    path: '/pinyin-quiz'
  },
  {
    id: 'vigenereCipher',
    nameKey: 'vigenereCipher',
    descriptionKey: 'vigenereCipherDesc',
    icon: 'https://placehold.co/60x60/1890ff/ffffff?text=VC',
    path: '/vigenere-cipher'
  }
];

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [tools] = useState(toolsData);
  const [filteredTools, setFilteredTools] = useState(toolsData);

  const handleToolClick = (path) => {
    navigate(path);
  };

  const handleSearch = (searchTerm) => {
    const filtered = tools.filter(tool => 
      t(tool.nameKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(tool.descriptionKey).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTools(filtered);
  };

  return (
    <div className="home">
      <Navbar onSearch={handleSearch} />
      <div className="tools-grid">
        {filteredTools.map(tool => (
          <div 
            key={tool.id} 
            className="tool-card"
            onClick={() => handleToolClick(tool.path)}
          >
            <img src={tool.icon} alt={t(tool.nameKey)} className="tool-icon" />
            <h3 className="tool-name">{t(tool.nameKey)}</h3>
            <p className="tool-description">{t(tool.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 