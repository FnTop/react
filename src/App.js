import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import ToolDetail from './pages/ToolDetail';
import PinyinQuiz from './components/Tools/PinyinQuiz';
import './App.css';

// 配置React Router的未来标志
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router {...router}>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tool/:id" element={<ToolDetail />} />
              <Route path="/pinyin-quiz" element={<PinyinQuiz />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
