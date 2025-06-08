import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './ToolDetail.css';

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 工具数据
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
    }
  ];

  // 获取当前工具信息
  const tool = toolsData.find(t => t.id === id);

  // 如果找不到工具，显示404页面
  if (!tool) {
    return (
      <div className="tool-detail error">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-icon">←</span>
          <span className="back-text">{t('backToHome')}</span>
        </button>
        <div className="error-content">
          <h1>404</h1>
          <p>{t('toolNotFound')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tool-detail">
      <button className="back-button" onClick={() => navigate('/')}>
        <span className="back-icon">←</span>
        <span className="back-text">{t('backToHome')}</span>
      </button>
      <div className="tool-content">
        <div className="tool-header">
          <img src={tool.icon} alt={t(tool.nameKey)} className="tool-icon" />
          <h1 className="tool-title">{t(tool.nameKey)}</h1>
        </div>
        <p className="tool-description">{t(tool.descriptionKey)}</p>
        <div className="tool-actions">
          <button className="primary-button" onClick={() => navigate(tool.path)}>
            {t('startUsing')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail; 