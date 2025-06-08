import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import ToolDetail from './pages/ToolDetail';
import PinyinQuiz from './components/Tools/PinyinQuiz';
import VigenereCipher from './components/Tools/VigenereCipher';
import './App.css';

// 配置React Router的未来标志
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  const [setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router {...router}>
          <div className="app">
            <Navbar onSearch={handleSearch} />
            <Routes>
              <Route path="/react" element={<Home />} />
              <Route path="/tool/:id" element={<ToolDetail />} />
              <Route path="/pinyin-quiz" element={<PinyinQuiz />} />
              <Route path="/vigenere-cipher" element={<VigenereCipher />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
