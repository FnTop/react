import React, { useState, useEffect, useCallback, useRef } from 'react';
import { defaultWeights } from './data';
import { generateQuestions } from './generator';
import './style.css';

const PinyinQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [weights, setWeights] = useState(defaultWeights);
  const [showSettings, setShowSettings] = useState(false);
  const [answerDelay, setAnswerDelay] = useState(1);
  const [questionCount, setQuestionCount] = useState(10);
  const [tempQuestionCount, setTempQuestionCount] = useState(10);
  const [strategy, setStrategy] = useState('weight'); // 'weight', 'idiom', 'zhz'
  const isUpdating = useRef(false);

  // 刷新题目
  const refreshQuestions = useCallback(() => {
    isUpdating.current = true;
    
    // 根据策略确定需要生成的题目类型
    let targetTypes = [];
    switch (strategy) {
      case 'idiom':
        targetTypes = ['成语'];
        break;
      case 'zhz':
        targetTypes = ['翘舌音vs平舌音'];
        break;
      case 'tone':
        targetTypes = ['声调易错'];
        break;
      case 'yunmu':
        targetTypes = ['韵母易错', '前后鼻音', '复韵母'];
        break;
      case 'shengmu':
        targetTypes = ['声母易错', '翘舌音vs平舌音', '鼻音vs边音', 'f和h', 'jqx'];
        break;
      case 'weight':
      case 'mixed':
      default:
        // 使用所有类型
        targetTypes = Object.keys(weights);
        break;
    }
    
    // 生成所有目标类型的题目
    const allQuestions = generateQuestions(1000).filter(q => targetTypes.includes(q.type));
    
    // 如果题库为空，返回空数组
    if (allQuestions.length === 0) {
      setQuestions([]);
      return;
    }
    
    // 确定实际可用的题目数量
    const actualQuestionCount = Math.min(questionCount, allQuestions.length);
    
    let selectedQuestions = [];
    
    switch (strategy) {
      case 'weight': {
        // 计算每种类型的权重总和
        const totalWeight = Object.entries(weights)
          .filter(([type]) => targetTypes.includes(type))
          .reduce((sum, [_, weight]) => sum + weight, 0);
        
        // 计算每种类型应该抽取的题目数量
        const typeCounts = {};
        Object.entries(weights)
          .filter(([type]) => targetTypes.includes(type))
          .forEach(([type, weight]) => {
            typeCounts[type] = Math.round((weight / totalWeight) * actualQuestionCount);
          });
        
        // 确保总数等于实际可用的题目数量
        const currentTotal = Object.values(typeCounts).reduce((sum, count) => sum + count, 0);
        if (currentTotal !== actualQuestionCount) {
          const diff = actualQuestionCount - currentTotal;
          const maxType = Object.entries(typeCounts).reduce((max, [type, count]) => 
            count > max.count ? { type, count } : max, 
            { type: '', count: 0 }
          );
          typeCounts[maxType.type] += diff;
        }
        
        // 按权重排序类型
        const sortedTypes = Object.entries(weights)
          .filter(([type]) => targetTypes.includes(type))
          .sort((a, b) => b[1] - a[1])
          .map(([type]) => type);
        
        // 按权重优先级抽取题目
        const usedQuestions = new Set();
        let remainingCount = actualQuestionCount;
        
        for (const type of sortedTypes) {
          if (remainingCount <= 0) break;
          
          const targetCount = typeCounts[type];
          const typeQuestions = allQuestions
            .filter(q => q.type === type && !usedQuestions.has(q.word))
            .sort(() => Math.random() - 0.5)
            .slice(0, targetCount);
          
          typeQuestions.forEach(q => usedQuestions.add(q.word));
          selectedQuestions.push(...typeQuestions);
          remainingCount -= typeQuestions.length;
        }
        
        // 如果还有剩余题目数量，从剩余类型中抽取
        if (remainingCount > 0) {
          const remainingTypes = sortedTypes.filter(type => 
            !selectedQuestions.some(q => q.type === type)
          );
          
          for (const type of remainingTypes) {
            if (remainingCount <= 0) break;
            
            const typeQuestions = allQuestions
              .filter(q => q.type === type && !usedQuestions.has(q.word))
              .sort(() => Math.random() - 0.5)
              .slice(0, remainingCount);
            
            typeQuestions.forEach(q => usedQuestions.add(q.word));
            selectedQuestions.push(...typeQuestions);
            remainingCount -= typeQuestions.length;
          }
        }
        break;
      }
        
      case 'mixed':
        // 随机抽取所有目标类型的题目，确保不重复
        selectedQuestions = allQuestions
          .sort(() => Math.random() - 0.5)
          .filter((q, index, self) => 
            index === self.findIndex(t => t.word === q.word)
          )
          .slice(0, actualQuestionCount);
        break;
        
      default:
        // 单一类型策略直接使用筛选后的题目，确保不重复
        selectedQuestions = allQuestions
          .sort(() => Math.random() - 0.5)
          .filter((q, index, self) => 
            index === self.findIndex(t => t.word === q.word)
          )
          .slice(0, actualQuestionCount);
        break;
    }
    
    // 设置题目
    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setShowResults(false);
    isUpdating.current = false;
  }, [weights, questionCount, strategy]);

  // 初始化题目
  useEffect(() => {
    if (!isUpdating.current) {
      refreshQuestions();
    }
  }, [refreshQuestions]);

  // 处理题目数量变化
  const handleQuestionCountChange = useCallback((value) => {
    const newCount = Math.max(1, Math.min(50, parseInt(value) || 1));
    setQuestionCount(newCount);
    setTempQuestionCount(newCount);
  }, []);

  // 处理临时题目数量变化
  const handleTempQuestionCountChange = (e) => {
    const value = e.target.value;
    setTempQuestionCount(value);
    handleQuestionCountChange(value);
  };

  // 处理答案选择
  const handleAnswer = useCallback((answer) => {
    const correct = answer === questions[currentQuestion].pinyin;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    // 根据设置的时长后进入下一题或显示结果
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, answerDelay * 1000);
  }, [currentQuestion, questions, answerDelay]);

  // 处理权重变化
  const handleWeightChange = (type, value) => {
    setWeights(prev => ({
      ...prev,
      [type]: Math.max(0.1, Math.min(10000, parseFloat(value) || 1))
    }));
  };

  // 显示设置页面
  if (showSettings) {
    // 计算每种类型的总题数
    const typeCounts = {};
    const allQuestions = generateQuestions(1000);
    allQuestions.forEach(q => {
      typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
    });

    return (
      <div className="pinyin-quiz">
        <div className="quiz-card settings">
          <h2>设置</h2>
          <div className="settings-section">
            <h3>基础设置</h3>
            <div className="basic-settings">
              <div className="setting-item">
                <label>题目数量</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={tempQuestionCount}
                  onChange={handleTempQuestionCountChange}
                />
              </div>
              <div className="setting-item">
                <label>下一题时长（秒）</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={answerDelay}
                  onChange={(e) => setAnswerDelay(Math.max(0, Math.min(10, parseFloat(e.target.value) || 0)))}
                />
              </div>
              <div className="setting-item">
                <label>抽题策略</label>
                <select 
                  value={strategy} 
                  onChange={(e) => setStrategy(e.target.value)}
                  className="strategy-select"
                >
                  <option value="weight">按权重抽题</option>
                  <option value="idiom">成语优先</option>
                  <option value="zhz">翘舌音vs平舌音优先</option>
                  <option value="tone">声调易错优先</option>
                  <option value="yunmu">韵母易错优先</option>
                  <option value="shengmu">声母易错优先</option>
                  <option value="mixed">综合练习</option>
                </select>
              </div>
            </div>
          </div>
          {strategy === 'weight' && (
            <div className="settings-section">
              <h3>题型权重设置</h3>
              <div className="weights-settings">
                {Object.entries(weights).map(([type, weight]) => (
                  <div key={type} className="weight-setting">
                    <label>
                      {type}
                      <span className="type-count">{typeCounts[type] || 0}题</span>
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      max="10000"
                      step="0.1"
                      value={weight}
                      onChange={(e) => handleWeightChange(type, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="button-group">
            <button className="save-button" onClick={() => {
              setShowSettings(false);
              refreshQuestions();
            }}>
              保存并开始
            </button>
            <button className="reset-button" onClick={() => {
              setWeights(defaultWeights);
              setQuestionCount(10);
              setTempQuestionCount(10);
              setAnswerDelay(1);
              setStrategy('weight');
            }}>
              重置设置
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 显示结果页面
  if (showResults) {
    return (
      <div className="pinyin-quiz">
        <div className="quiz-card results">
          <h2>测试完成</h2>
          <p className="score">得分：{score}/{questions.length}</p>
          <div className="button-group">
            <button className="restart-button" onClick={refreshQuestions}>
              重新开始
            </button>
            <button className="settings-button" onClick={() => setShowSettings(true)}>
              设置
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 显示加载状态
  if (questions.length === 0) {
    return (
      <div className="pinyin-quiz">
        <div className="quiz-card">
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  // 获取当前题目
  const currentQ = questions[currentQuestion];
  const wordArray = currentQ.word.split('');

  // 渲染题目页面
  return (
    <div className="pinyin-quiz">
      <div className="quiz-card">
        <div className="header">
          <div className="progress">
            第 {currentQuestion + 1} 题 / 共 {questions.length} 题
          </div>
          <div className="button-group">
            <button className="refresh-button" onClick={refreshQuestions}>
              刷新题目
            </button>
            <button className="settings-button" onClick={() => setShowSettings(true)}>
              设置
            </button>
          </div>
        </div>
        <div className="question-section">
          <h2 className="question-title">请选择正确的拼音</h2>
          <div className="word-display">
            {wordArray.map((char, index) => (
              <span
                key={index}
                className={`char ${index === currentQ.highlightIndex ? 'highlighted' : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="pinyin-type">{currentQ.type}</div>
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
                  : selectedAnswer && option === currentQ.pinyin
                    ? 'correct-answer'
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
            {isCorrect ? '回答正确！' : `回答错误，正确答案：${currentQ.pinyin}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default PinyinQuiz;