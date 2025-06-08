import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Home.css';

const toolsData = [
  {
    id: '1',
    nameKey: 'textToSpeech',
    descriptionKey: 'textToSpeechDesc',
    icon: 'https://placehold.co/60x60/2196f3/ffffff?text=TT',
    path: '/text-to-speech'
  },
  {
    id: '2',
    nameKey: 'speechToText',
    descriptionKey: 'speechToTextDesc',
    icon: 'https://placehold.co/60x60/4caf50/ffffff?text=ST',
    path: '/speech-to-text'
  },
  {
    id: '3',
    nameKey: 'imageToText',
    descriptionKey: 'imageToTextDesc',
    icon: 'https://placehold.co/60x60/f44336/ffffff?text=IT',
    path: '/image-to-text'
  },
  {
    id: '4',
    nameKey: 'textToImage',
    descriptionKey: 'textToImageDesc',
    icon: 'https://placehold.co/60x60/ff9800/ffffff?text=TI',
    path: '/text-to-image'
  },
  {
    id: '5',
    nameKey: 'textToPdf',
    descriptionKey: 'textToPdfDesc',
    icon: 'https://placehold.co/60x60/9c27b0/ffffff?text=TP',
    path: '/text-to-pdf'
  },
  {
    id: '6',
    nameKey: 'pdfToText',
    descriptionKey: 'pdfToTextDesc',
    icon: 'https://placehold.co/60x60/607d8b/ffffff?text=PT',
    path: '/pdf-to-text'
  },
  {
    id: '7',
    nameKey: 'pinyinQuiz',
    descriptionKey: 'pinyinQuizDesc',
    icon: 'https://placehold.co/60x60/795548/ffffff?text=PQ',
    path: '/pinyin-quiz'
  }
];

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [tools] = useState(toolsData);

  const handleToolClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      <Navbar />
      <div className="tools-grid">
        {tools.map(tool => (
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