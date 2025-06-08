// 拼音题目生成器
const pinyinRules = {
  // 声母规则
  initials: {
    '翘舌音vs平舌音': {
      zh: ['z', 'ch', 'sh'],
      ch: ['c', 'zh', 'sh'],
      sh: ['s', 'zh', 'ch'],
      z: ['zh', 'c', 's'],
      c: ['ch', 'z', 's'],
      s: ['sh', 'z', 'c']
    },
    '鼻音vs边音': {
      n: ['l', 'r'],
      l: ['n', 'r'],
      r: ['n', 'l']
    },
    'f和h': {
      f: ['h'],
      h: ['f']
    },
    'jqx': {
      j: ['q', 'x'],
      q: ['j', 'x'],
      x: ['j', 'q']
    }
  },
  // 韵母规则
  finals: {
    '前后鼻音': {
      'an': ['ang'],
      'ang': ['an'],
      'en': ['eng'],
      'eng': ['en'],
      'in': ['ing'],
      'ing': ['in'],
      'ian': ['iang'],
      'iang': ['ian'],
      'uan': ['uang'],
      'uang': ['uan']
    },
    '复韵母': {
      'ai': ['ei'],
      'ei': ['ai'],
      'ao': ['ou'],
      'ou': ['ao'],
      'ia': ['ie'],
      'ie': ['ia'],
      'ua': ['uo'],
      'uo': ['ua']
    }
  },
  // 声调规则
  tones: {
    '声调易错': {
      'ā': ['á', 'ǎ', 'à'],
      'á': ['ā', 'ǎ', 'à'],
      'ǎ': ['ā', 'á', 'à'],
      'à': ['ā', 'á', 'ǎ']
    }
  },
  // 添加成语规则
  '成语': {
    'shǒu': ['shōu', 'shóu', 'shòu'],
    'huà': ['huā', 'huá', 'huà'],
    'wáng': ['wāng', 'wáng', 'wǎng'],
    'yǎn': ['yān', 'yán', 'yàn'],
    'kè': ['kē', 'ké', 'kè']
  }
};

// 基础词库
let wordBase = {
  '翘舌音vs平舌音': [
    { word: '知识', pinyin: 'zhī', base: 'zhī' },
    { word: '城市', pinyin: 'chéng', base: 'chéng' },
    { word: '诗人', pinyin: 'shī', base: 'shī' },
    { word: '中国', pinyin: 'zhōng', base: 'zhōng' },
    { word: '吃饭', pinyin: 'chī', base: 'chī' },
    { word: '上海', pinyin: 'shàng', base: 'shàng' },
    { word: '自己', pinyin: 'zì', base: 'zì' },
    { word: '从', pinyin: 'cóng', base: 'cóng' },
    { word: '三', pinyin: 'sān', base: 'sān' },
    { word: '早晨', pinyin: 'zǎo', base: 'zǎo' },
    { word: '曾经', pinyin: 'céng', base: 'céng' },
    { word: '思想', pinyin: 'sī', base: 'sī' },
    { word: '知识', pinyin: 'zhī', base: 'zhī' },
    { word: '智慧', pinyin: 'zhì', base: 'zhì' },
    { word: '真诚', pinyin: 'zhēn', base: 'zhēn' },
    { word: '成长', pinyin: 'chéng', base: 'chéng' },
    { word: '成功', pinyin: 'chéng', base: 'chéng' },
    { word: '诚实', pinyin: 'chéng', base: 'chéng' },
    { word: '生活', pinyin: 'shēng', base: 'shēng' },
    { word: '生命', pinyin: 'shēng', base: 'shēng' },
    { word: '声音', pinyin: 'shēng', base: 'shēng' },
    { word: '自己', pinyin: 'zì', base: 'zì' },
    { word: '自由', pinyin: 'zì', base: 'zì' },
    { word: '自然', pinyin: 'zì', base: 'zì' },
    { word: '曾经', pinyin: 'céng', base: 'céng' },
    { word: '层次', pinyin: 'céng', base: 'céng' },
    { word: '存在', pinyin: 'cún', base: 'cún' },
    { word: '思想', pinyin: 'sī', base: 'sī' },
    { word: '思考', pinyin: 'sī', base: 'sī' },
    { word: '死亡', pinyin: 'sǐ', base: 'sǐ' },
    { word: '知识', pinyin: 'zhī', base: 'zhī' },
    { word: '智慧', pinyin: 'zhì', base: 'zhì' },
    { word: '真诚', pinyin: 'zhēn', base: 'zhēn' },
    { word: '成长', pinyin: 'chéng', base: 'chéng' },
    { word: '成功', pinyin: 'chéng', base: 'chéng' },
    { word: '诚实', pinyin: 'chéng', base: 'chéng' },
    { word: '生活', pinyin: 'shēng', base: 'shēng' },
    { word: '生命', pinyin: 'shēng', base: 'shēng' },
    { word: '声音', pinyin: 'shēng', base: 'shēng' },
    { word: '自己', pinyin: 'zì', base: 'zì' },
    { word: '自由', pinyin: 'zì', base: 'zì' },
    { word: '自然', pinyin: 'zì', base: 'zì' },
    { word: '曾经', pinyin: 'céng', base: 'céng' },
    { word: '层次', pinyin: 'céng', base: 'céng' },
    { word: '存在', pinyin: 'cún', base: 'cún' },
    { word: '思想', pinyin: 'sī', base: 'sī' },
    { word: '思考', pinyin: 'sī', base: 'sī' },
    { word: '死亡', pinyin: 'sǐ', base: 'sǐ' }
  ],
  '鼻音vs边音': [
    { word: '南方', pinyin: 'nán', base: 'nán' },
    { word: '老人', pinyin: 'lǎo', base: 'lǎo' },
    { word: '热闹', pinyin: 'rè', base: 'rè' },
    { word: '牛奶', pinyin: 'niú', base: 'niú' },
    { word: '老师', pinyin: 'lǎo', base: 'lǎo' },
    { word: '人民', pinyin: 'rén', base: 'rén' },
    { word: '年轻', pinyin: 'nián', base: 'nián' },
    { word: '历史', pinyin: 'lì', base: 'lì' },
    { word: '热情', pinyin: 'rè', base: 'rè' },
    { word: '能力', pinyin: 'néng', base: 'néng' },
    { word: '内心', pinyin: 'nèi', base: 'nèi' },
    { word: '年轻', pinyin: 'nián', base: 'nián' },
    { word: '努力', pinyin: 'nǔ', base: 'nǔ' },
    { word: '历史', pinyin: 'lì', base: 'lì' },
    { word: '力量', pinyin: 'lì', base: 'lì' },
    { word: '理想', pinyin: 'lǐ', base: 'lǐ' },
    { word: '理解', pinyin: 'lǐ', base: 'lǐ' },
    { word: '人民', pinyin: 'rén', base: 'rén' },
    { word: '热情', pinyin: 'rè', base: 'rè' },
    { word: '认真', pinyin: 'rèn', base: 'rèn' },
    { word: '人生', pinyin: 'rén', base: 'rén' },
    { word: '能力', pinyin: 'néng', base: 'néng' },
    { word: '内心', pinyin: 'nèi', base: 'nèi' },
    { word: '年轻', pinyin: 'nián', base: 'nián' },
    { word: '努力', pinyin: 'nǔ', base: 'nǔ' },
    { word: '历史', pinyin: 'lì', base: 'lì' },
    { word: '力量', pinyin: 'lì', base: 'lì' },
    { word: '理想', pinyin: 'lǐ', base: 'lǐ' },
    { word: '理解', pinyin: 'lǐ', base: 'lǐ' },
    { word: '人民', pinyin: 'rén', base: 'rén' },
    { word: '热情', pinyin: 'rè', base: 'rè' },
    { word: '认真', pinyin: 'rèn', base: 'rèn' },
    { word: '人生', pinyin: 'rén', base: 'rén' }
  ],
  '前后鼻音': [
    { word: '春天', pinyin: 'chūn', base: 'chūn' },
    { word: '英雄', pinyin: 'yīng', base: 'yīng' },
    { word: '长城', pinyin: 'cháng', base: 'cháng' },
    { word: '北京', pinyin: 'běi', base: 'běi' },
    { word: '朋友', pinyin: 'péng', base: 'péng' },
    { word: '明天', pinyin: 'míng', base: 'míng' },
    { word: '安静', pinyin: 'ān', base: 'ān' },
    { word: '阳光', pinyin: 'yáng', base: 'yáng' },
    { word: '认真', pinyin: 'rèn', base: 'rèn' },
    { word: '成功', pinyin: 'chéng', base: 'chéng' },
    { word: '安静', pinyin: 'ān', base: 'ān' },
    { word: '安全', pinyin: 'ān', base: 'ān' },
    { word: '安心', pinyin: 'ān', base: 'ān' },
    { word: '阳光', pinyin: 'yáng', base: 'yáng' },
    { word: '样子', pinyin: 'yàng', base: 'yàng' },
    { word: '阳光', pinyin: 'yáng', base: 'yáng' },
    { word: '认真', pinyin: 'rèn', base: 'rèn' },
    { word: '认识', pinyin: 'rèn', base: 'rèn' },
    { word: '人民', pinyin: 'rén', base: 'rén' },
    { word: '成功', pinyin: 'chéng', base: 'chéng' },
    { word: '成长', pinyin: 'chéng', base: 'chéng' },
    { word: '城市', pinyin: 'chéng', base: 'chéng' },
    { word: '安静', pinyin: 'ān', base: 'ān' },
    { word: '安全', pinyin: 'ān', base: 'ān' },
    { word: '安心', pinyin: 'ān', base: 'ān' },
    { word: '阳光', pinyin: 'yáng', base: 'yáng' },
    { word: '样子', pinyin: 'yàng', base: 'yàng' },
    { word: '阳光', pinyin: 'yáng', base: 'yáng' },
    { word: '认真', pinyin: 'rèn', base: 'rèn' },
    { word: '认识', pinyin: 'rèn', base: 'rèn' },
    { word: '人民', pinyin: 'rén', base: 'rén' },
    { word: '成功', pinyin: 'chéng', base: 'chéng' },
    { word: '成长', pinyin: 'chéng', base: 'chéng' },
    { word: '城市', pinyin: 'chéng', base: 'chéng' }
  ],
  '声调易错': [
    { word: '妈妈', pinyin: 'mā', base: 'mā' },
    { word: '爸爸', pinyin: 'bà', base: 'bà' },
    { word: '老师', pinyin: 'lǎo', base: 'lǎo' },
    { word: '学生', pinyin: 'xué', base: 'xué' },
    { word: '朋友', pinyin: 'péng', base: 'péng' },
    { word: '明天', pinyin: 'míng', base: 'míng' },
    { word: '学习', pinyin: 'xué', base: 'xué' },
    { word: '考试', pinyin: 'kǎo', base: 'kǎo' },
    { word: '努力', pinyin: 'nǔ', base: 'nǔ' },
    { word: '妈妈', pinyin: 'mā', base: 'mā' },
    { word: '爸爸', pinyin: 'bà', base: 'bà' },
    { word: '老师', pinyin: 'lǎo', base: 'lǎo' },
    { word: '学生', pinyin: 'xué', base: 'xué' },
    { word: '朋友', pinyin: 'péng', base: 'péng' },
    { word: '明天', pinyin: 'míng', base: 'míng' },
    { word: '学习', pinyin: 'xué', base: 'xué' },
    { word: '考试', pinyin: 'kǎo', base: 'kǎo' },
    { word: '努力', pinyin: 'nǔ', base: 'nǔ' },
    { word: '生活', pinyin: 'shēng', base: 'shēng' },
    { word: '生命', pinyin: 'shēng', base: 'shēng' },
    { word: '声音', pinyin: 'shēng', base: 'shēng' }
  ],
  'f和h': [
    { word: '飞机', pinyin: 'fēi', base: 'fēi' },
    { word: '火车', pinyin: 'huǒ', base: 'huǒ' },
    { word: '发现', pinyin: 'fā', base: 'fā' },
    { word: '花园', pinyin: 'huā', base: 'huā' },
    { word: '发展', pinyin: 'fā', base: 'fā' },
    { word: '环境', pinyin: 'huán', base: 'huán' },
    { word: '发现', pinyin: 'fā', base: 'fā' },
    { word: '发展', pinyin: 'fā', base: 'fā' },
    { word: '方法', pinyin: 'fāng', base: 'fāng' },
    { word: '方向', pinyin: 'fāng', base: 'fāng' },
    { word: '花园', pinyin: 'huā', base: 'huā' },
    { word: '花朵', pinyin: 'huā', base: 'huā' },
    { word: '环境', pinyin: 'huán', base: 'huán' },
    { word: '欢迎', pinyin: 'huān', base: 'huān' },
    { word: '回答', pinyin: 'huí', base: 'huí' }
  ],
  'jqx': [
    { word: '家庭', pinyin: 'jiā', base: 'jiā' },
    { word: '学校', pinyin: 'xué', base: 'xué' },
    { word: '前进', pinyin: 'qián', base: 'qián' },
    { word: '希望', pinyin: 'xī', base: 'xī' },
    { word: '坚强', pinyin: 'jiān', base: 'jiān' },
    { word: '秋天', pinyin: 'qiū', base: 'qiū' },
    { word: '家庭', pinyin: 'jiā', base: 'jiā' },
    { word: '家人', pinyin: 'jiā', base: 'jiā' },
    { word: '坚强', pinyin: 'jiān', base: 'jiān' },
    { word: '前进', pinyin: 'qián', base: 'qián' },
    { word: '前进', pinyin: 'qián', base: 'qián' },
    { word: '前进', pinyin: 'qián', base: 'qián' },
    { word: '学校', pinyin: 'xué', base: 'xué' },
    { word: '学习', pinyin: 'xué', base: 'xué' },
    { word: '希望', pinyin: 'xī', base: 'xī' }
  ],
  '复韵母': [
    { word: '爱', pinyin: 'ài', base: 'ài' },
    { word: '美', pinyin: 'měi', base: 'měi' },
    { word: '好', pinyin: 'hǎo', base: 'hǎo' },
    { word: '走', pinyin: 'zǒu', base: 'zǒu' },
    { word: '家', pinyin: 'jiā', base: 'jiā' },
    { word: '写', pinyin: 'xiě', base: 'xiě' },
    { word: '爱', pinyin: 'ài', base: 'ài' },
    { word: '爱情', pinyin: 'ài', base: 'ài' },
    { word: '美好', pinyin: 'měi', base: 'měi' },
    { word: '美丽', pinyin: 'měi', base: 'měi' },
    { word: '好人', pinyin: 'hǎo', base: 'hǎo' },
    { word: '好处', pinyin: 'hǎo', base: 'hǎo' },
    { word: '走路', pinyin: 'zǒu', base: 'zǒu' },
    { word: '走开', pinyin: 'zǒu', base: 'zǒu' },
    { word: '家人', pinyin: 'jiā', base: 'jiā' },
    { word: '家庭', pinyin: 'jiā', base: 'jiā' },
    { word: '写作', pinyin: 'xiě', base: 'xiě' },
    { word: '写字', pinyin: 'xiě', base: 'xiě' }
  ],
  '成语': [
    { word: '守株待兔', pinyin: 'shǒu', base: 'shǒu' },
    { word: '画蛇添足', pinyin: 'huà', base: 'huà' },
    { word: '亡羊补牢', pinyin: 'wáng', base: 'wáng' },
    { word: '掩耳盗铃', pinyin: 'yǎn', base: 'yǎn' },
    { word: '刻舟求剑', pinyin: 'kè', base: 'kè' },
    { word: '望梅止渴', pinyin: 'wàng', base: 'wàng' },
    { word: '对牛弹琴', pinyin: 'duì', base: 'duì' },
    { word: '画龙点睛', pinyin: 'huà', base: 'huà' }
  ],
  '单字': [
    { word: '爱', pinyin: 'ài', base: 'ài' },
    { word: '美', pinyin: 'měi', base: 'měi' },
    { word: '好', pinyin: 'hǎo', base: 'hǎo' },
    { word: '走', pinyin: 'zǒu', base: 'zǒu' },
    { word: '家', pinyin: 'jiā', base: 'jiā' },
    { word: '写', pinyin: 'xiě', base: 'xiě' },
    { word: '爱', pinyin: 'ài', base: 'ài' },
    { word: '美', pinyin: 'měi', base: 'měi' },
    { word: '好', pinyin: 'hǎo', base: 'hǎo' },
    { word: '走', pinyin: 'zǒu', base: 'zǒu' },
    { word: '爱', pinyin: 'ài', base: 'ài' },
    { word: '美', pinyin: 'měi', base: 'měi' },
    { word: '好', pinyin: 'hǎo', base: 'hǎo' },
    { word: '走', pinyin: 'zǒu', base: 'zǒu' },
    { word: '家', pinyin: 'jiā', base: 'jiā' },
    { word: '写', pinyin: 'xiě', base: 'xiě' },
    { word: '爱', pinyin: 'ài', base: 'ài' },
    { word: '美', pinyin: 'měi', base: 'měi' },
    { word: '好', pinyin: 'hǎo', base: 'hǎo' },
    { word: '走', pinyin: 'zǒu', base: 'zǒu' }
  ]
};

// 题库去重逻辑
Object.keys(wordBase).forEach(type => {
  const seen = new Set();
  wordBase[type] = wordBase[type].filter(item => {
    const key = item.word + '_' + item.pinyin;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
});

// 获取拼音的声母
const getInitial = (pinyin) => {
  const match = pinyin.match(/^[a-z]+/);
  return match ? match[0] : pinyin.charAt(0);
};

// 获取拼音的韵母
const getFinal = (pinyin) => {
  const match = pinyin.match(/[a-z]+$/);
  return match ? match[0] : pinyin;
};

// 获取拼音的声调
const getTone = (pinyin) => {
  const match = pinyin.match(/[āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ]/);
  return match ? match[0] : pinyin;
};

// 生成选项
const generateOptions = (type, basePinyin) => {
  let options = [basePinyin];
  let rules = [];

  try {
    // 根据类型选择规则
    if (type === '翘舌音vs平舌音' || type === '鼻音vs边音' || type === 'f和h' || type === 'jqx') {
      const initial = getInitial(basePinyin);
      rules = pinyinRules.initials[type]?.[initial] || [];
    } else if (type === '前后鼻音' || type === '复韵母') {
      const final = getFinal(basePinyin);
      rules = pinyinRules.finals[type]?.[final] || [];
    } else if (type === '声调易错') {
      const tone = getTone(basePinyin);
      rules = pinyinRules.tones[type]?.[tone] || [];
    } else if (type === '成语') {
      const initial = getInitial(basePinyin);
      rules = pinyinRules['成语']?.[initial] || [];
    }

    // 确保rules是数组
    if (!Array.isArray(rules)) {
      rules = [];
    }

    // 生成错误选项
    rules.forEach(rule => {
      let wrongPinyin = basePinyin;
      if (type === '翘舌音vs平舌音' || type === '鼻音vs边音' || type === 'f和h' || type === 'jqx') {
        wrongPinyin = rule + basePinyin.slice(1);
      } else if (type === '前后鼻音' || type === '复韵母') {
        wrongPinyin = basePinyin.replace(/[a-z]+$/, rule);
      } else if (type === '声调易错' || type === '成语') {
        wrongPinyin = basePinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ]/, rule);
      }
      if (wrongPinyin && !options.includes(wrongPinyin)) {
        options.push(wrongPinyin);
      }
    });

    // 如果选项不足4个，添加一些随机声调变化
    while (options.length < 4) {
      const tones = ['ā', 'á', 'ǎ', 'à'];
      const randomTone = tones[Math.floor(Math.random() * tones.length)];
      const newPinyin = basePinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ]/, randomTone);
      if (newPinyin && !options.includes(newPinyin)) {
        options.push(newPinyin);
      }
    }

    return options.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('生成选项时出错:', error);
    // 返回默认选项，使用正确的拼音变体
    const tones = ['ā', 'á', 'ǎ', 'à'];
    return [
      basePinyin,
      basePinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ]/, tones[1]),
      basePinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ]/, tones[2]),
      basePinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ]/, tones[3])
    ].sort(() => Math.random() - 0.5);
  }
};

// 生成单个题目
const generateSingleQuestion = (type, existingQuestions = []) => {
  try {
    const typeWords = wordBase[type];
    if (!typeWords || typeWords.length === 0) {
      throw new Error(`没有找到类型 ${type} 的词库`);
    }
    const randomWord = typeWords[Math.floor(Math.random() * typeWords.length)];
    
    return {
      word: randomWord.word,
      highlightIndex: 0,
      pinyin: randomWord.pinyin,
      type: type,
      options: generateOptions(type, randomWord.base)
    };
  } catch (error) {
    console.error('生成题目时出错:', error);
    // 返回一个默认题目
    return {
      word: '测试',
      highlightIndex: 0,
      pinyin: 'cè',
      type: type,
      options: ['cè', 'cē', 'cé', 'cě']
    };
  }
};

// 生成指定数量的题目
export const generateQuestions = (count = 10) => {
  const types = Object.keys(wordBase);
  
  // 创建一个包含所有可能题目的数组
  let allPossibleQuestions = [];
  types.forEach(type => {
    const typeWords = wordBase[type];
    typeWords.forEach(word => {
      allPossibleQuestions.push({
        word: word.word,
        highlightIndex: 0,
        pinyin: word.pinyin,
        type: type,
        base: word.base
      });
    });
  });

  // 随机打乱所有题目
  allPossibleQuestions = allPossibleQuestions.sort(() => Math.random() - 0.5);

  // 从打乱的题目中抽取指定数量
  const selectedQuestions = allPossibleQuestions.slice(0, count);

  // 为每个选中的题目生成选项
  selectedQuestions.forEach(question => {
    question.options = generateOptions(question.type, question.base);
  });

  return selectedQuestions;
};

// 合并生成的题目和原始题库
export const combineQuestions = (originalQuestions, generatedCount = 50) => {
  try {
    // 生成新的题目
    const generatedQuestions = generateQuestions(generatedCount);
    
    // 合并题目并去重
    const combinedQuestions = [...originalQuestions];
    generatedQuestions.forEach(newQuestion => {
      // 检查是否已存在相同的题目
      const isDuplicate = combinedQuestions.some(
        existingQuestion => 
          existingQuestion.word === newQuestion.word && 
          existingQuestion.pinyin === newQuestion.pinyin &&
          existingQuestion.type === newQuestion.type
      );
      
      if (!isDuplicate) {
        combinedQuestions.push(newQuestion);
      }
    });

    // 确保每种类型至少有一个题目
    const types = Object.keys(wordBase);
    types.forEach(type => {
      const hasTypeQuestion = combinedQuestions.some(q => q.type === type);
      if (!hasTypeQuestion) {
        const typeQuestion = generateSingleQuestion(type);
        combinedQuestions.push(typeQuestion);
      }
    });

    return combinedQuestions;
  } catch (error) {
    console.error('合并题目时出错:', error);
    return originalQuestions;
  }
}; 