import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const { t } = useLanguage();

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t('search')}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar; 