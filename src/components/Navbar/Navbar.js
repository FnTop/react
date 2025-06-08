import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { NavLink } from 'react-router-dom';
import { themes } from '../../themes';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const themeList = Object.values(themes).map(theme => ({
    id: theme.id,
    name: theme.name,
    icon: theme.icon
  }));

  const languages = [
    { id: 'zhCN', name: t('zhCN') },
    { id: 'enUS', name: t('enUS') }
  ];

  const handleThemeChange = (newTheme) => {
    toggleTheme(newTheme);
    setShowThemeMenu(false);
  };

  const handleLanguageChange = (newLang) => {
    changeLanguage(newLang);
    setShowLangMenu(false);
  };

  const navItems = [
    { path: '/react', label: t('home') },
    { path: '/tools', label: t('tools') },
    { path: '/settings', label: t('settings') }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-menu">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="navbar-right">
          <div className="search-section">
            <input
              type="text"
              placeholder={t('search')}
              onChange={(e) => onSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="navbar-buttons">
            <div className="dropdown">
              <button 
                className="dropdown-button"
                onClick={() => setShowThemeMenu(!showThemeMenu)}
              >
                {themeList.find(t => t.id === theme)?.icon} {t('theme')}
              </button>
              {showThemeMenu && (
                <div className="dropdown-menu">
                  {themeList.map(t => (
                    <button
                      key={t.id}
                      className={`dropdown-item ${theme === t.id ? 'active' : ''}`}
                      onClick={() => handleThemeChange(t.id)}
                    >
                      {t.icon} {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown">
              <button 
                className="dropdown-button"
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                {currentLanguage === 'zhCN' ? '中' : 'EN'}
              </button>
              {showLangMenu && (
                <div className="dropdown-menu">
                  {languages.map(lang => (
                    <button
                      key={lang.id}
                      className={`dropdown-item ${currentLanguage === lang.id ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(lang.id)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 