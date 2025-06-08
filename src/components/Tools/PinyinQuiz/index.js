import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import './style.css';

// 普通话二级易错拼音题库
const pinyinDatabase = [
  // 声母易错
  { word: '踌躇', highlightIndex: 0, options: ['chóu', 'zhóu', 'cóu', 'zóu'], correctAnswer: 'chóu' },
  { word: '憧憬', highlightIndex: 0, options: ['chōng', 'zhōng', 'cōng', 'zōng'], correctAnswer: 'chōng' },
  { word: '踯躅', highlightIndex: 0, options: ['zhí', 'chí', 'zí', 'cí'], correctAnswer: 'zhí' },
  { word: '踌躇', highlightIndex: 1, options: ['chú', 'zhú', 'cú', 'zú'], correctAnswer: 'chú' },
  { word: '憧憬', highlightIndex: 1, options: ['jǐng', 'qǐng', 'xǐng', 'yǐng'], correctAnswer: 'jǐng' },
  { word: '踯躅', highlightIndex: 1, options: ['zhú', 'chú', 'zú', 'cú'], correctAnswer: 'zhú' },
  
  // 韵母易错
  { word: '憧憬', highlightIndex: 0, options: ['chōng', 'chūn', 'chāng', 'chēng'], correctAnswer: 'chōng' },
  { word: '踌躇', highlightIndex: 0, options: ['chóu', 'cháo', 'chōu', 'chāo'], correctAnswer: 'chóu' },
  { word: '踯躅', highlightIndex: 0, options: ['zhí', 'zhé', 'zhú', 'zhā'], correctAnswer: 'zhí' },
  
  // 声调易错
  { word: '憧憬', highlightIndex: 0, options: ['chōng', 'chóng', 'chǒng', 'chòng'], correctAnswer: 'chōng' },
  { word: '踌躇', highlightIndex: 0, options: ['chóu', 'chōu', 'chǒu', 'chòu'], correctAnswer: 'chóu' },
  { word: '踯躅', highlightIndex: 0, options: ['zhí', 'zhī', 'zhǐ', 'zhì'], correctAnswer: 'zhí' },
  
  // 多音字
  { word: '长', highlightIndex: 0, options: ['cháng', 'zhǎng', 'chǎng', 'zhàng'], correctAnswer: 'cháng' },
  { word: '重', highlightIndex: 0, options: ['zhòng', 'chóng', 'zhǒng', 'chǒng'], correctAnswer: 'zhòng' },
  { word: '长', highlightIndex: 0, options: ['zhǎng', 'cháng', 'zhàng', 'chǎng'], correctAnswer: 'zhǎng' },
  
  // 轻声
  { word: '踌躇', highlightIndex: 1, options: ['chú', 'chu', 'chū', 'chǔ'], correctAnswer: 'chú' },
  { word: '憧憬', highlightIndex: 1, options: ['jǐng', 'jing', 'jīng', 'jǐng'], correctAnswer: 'jǐng' },
  { word: '踯躅', highlightIndex: 1, options: ['zhú', 'zhu', 'zhū', 'zhǔ'], correctAnswer: 'zhú' }
];

// 随机抽取题目
const getRandomQuestions = (count = 10) => {
  const shuffled = [...pinyinDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const PinyinQuiz = () => {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 初始化题目
  useEffect(() => {
    setQuestions(getRandomQuestions(10));
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setQuestions(getRandomQuestions(10));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="pinyin-quiz">
        <div className="quiz-card results">
          <h2>{t('quizComplete')}</h2>
          <p className="score">{t('yourScore')}: {score}/{questions.length}</p>
          <button className="restart-button" onClick={restartQuiz}>
            {t('restartQuiz')}
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="pinyin-quiz">
        <div className="quiz-card">
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const wordArray = currentQ.word.split('');

  return (
    <div className="pinyin-quiz">
      <div className="quiz-card">
        <div className="question-section">
          <h2 className="question-title">{t('selectCorrectPinyin')}</h2>
          <div className="word-display">
            {wordArray.map((char, index) => (
              <span
                key={index}
                className={index === currentQ.highlightIndex ? 'highlighted' : ''}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="options-section">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : selectedAnswer
                    ? 'disabled'
                    : ''
              }`}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? t('correct') : `${t('incorrect')} - ${t('correctAnswer')}: ${currentQ.correctAnswer}`}
          </div>
        )}

        <div className="progress">
          {t('question')} {currentQuestion + 1}/{questions.length}
        </div>
      </div>
    </div>
  );
};

export default PinyinQuiz; 