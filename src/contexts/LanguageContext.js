import React, { createContext, useContext, useState } from 'react';
import zhCN from '../locales/zhCN';
import enUS from '../locales/enUS';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('zhCN');
  
  const translations = {
    zhCN,
    enUS
  };

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 