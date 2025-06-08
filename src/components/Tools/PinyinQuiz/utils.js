// 拼音规范定义
const PINYIN_RULES = {
  // 声母列表
  shengmu: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'],
  
  // 韵母列表
  yunmu: ['a', 'o', 'e', 'i', 'u', 'ü', 'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er', 'an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong'],
  
  // 声调列表
  tones: ['ā', 'á', 'ǎ', 'à', 'ē', 'é', 'ě', 'è', 'ī', 'í', 'ǐ', 'ì', 'ō', 'ó', 'ǒ', 'ò', 'ū', 'ú', 'ǔ', 'ù', 'ǖ', 'ǘ', 'ǚ', 'ǜ']
};

// 预定义的错误选项库
const WRONG_OPTIONS_DB = {
  // 翘舌音易错选项
  'zh': ['z', 'ch', 'sh'],
  'ch': ['zh', 'c', 'sh'],
  'sh': ['zh', 'ch', 's'],
  'z': ['zh', 'c', 's'],
  'c': ['z', 'ch', 's'],
  's': ['sh', 'z', 'c'],
  
  // 鼻音易错选项
  'n': ['l', 'r'],
  'l': ['n', 'r'],
  'r': ['l', 'n'],
  
  // 其他易错声母
  'f': ['h'],
  'h': ['f'],
  'b': ['p', 'm'],
  'p': ['b', 'm'],
  'm': ['b', 'p'],
  'd': ['t', 'n'],
  't': ['d', 'n'],
  'g': ['k', 'h'],
  'k': ['g', 'h'],
  'j': ['q', 'x'],
  'q': ['j', 'x'],
  'x': ['j', 'q']
};

// 预定义的错误韵母组合
const WRONG_YUNMU_DB = {
  'an': ['ang', 'en'],
  'ang': ['an', 'eng'],
  'en': ['eng', 'an'],
  'eng': ['en', 'ang'],
  'in': ['ing', 'un'],
  'ing': ['in', 'ong'],
  'un': ['ün', 'in'],
  'ün': ['un', 'in'],
  'ong': ['ing', 'eng'],
  'ai': ['ei', 'ao'],
  'ei': ['ai', 'ui'],
  'ao': ['ou', 'ai'],
  'ou': ['ao', 'iu'],
  'ie': ['üe', 'ia'],
  'üe': ['ie', 'üa']
};

// 随机打乱数组
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 验证拼音是否正确
export const isValidPinyin = (pinyin) => {
  // 检查是否包含声调
  const hasTone = PINYIN_RULES.tones.some(tone => pinyin.includes(tone));
  
  // 移除声调
  const basePinyin = pinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, '');
  
  // 检查声母
  let shengmu = '';
  if (basePinyin.startsWith('zh') || basePinyin.startsWith('ch') || basePinyin.startsWith('sh')) {
    shengmu = basePinyin.substring(0, 2);
  } else {
    shengmu = basePinyin.substring(0, 1);
  }
  
  // 检查韵母
  const yunmu = basePinyin.substring(shengmu.length);
  
  // 验证声母和韵母的组合是否合法
  return PINYIN_RULES.shengmu.includes(shengmu) && 
         PINYIN_RULES.yunmu.includes(yunmu) && 
         (hasTone || pinyin === basePinyin);
};

// 生成错误选项
export const generateWrongOptions = (correctPinyin) => {
  const options = new Set();
  const basePinyin = correctPinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, '');
  
  // 获取声母和韵母
  const shengmu = basePinyin.startsWith('zh') || basePinyin.startsWith('ch') || basePinyin.startsWith('sh') 
    ? basePinyin.substring(0, 2) 
    : basePinyin.substring(0, 1);
  const yunmu = basePinyin.substring(shengmu.length);
  
  // 1. 使用预定义的声母错误选项
  if (WRONG_OPTIONS_DB[shengmu]) {
    for (const wrongShengmu of WRONG_OPTIONS_DB[shengmu]) {
      const newPinyin = wrongShengmu + yunmu;
      if (isValidPinyin(newPinyin)) {
        options.add(newPinyin);
        if (options.size === 3) return Array.from(options);
      }
    }
  }
  
  // 2. 使用预定义的韵母错误选项
  if (WRONG_YUNMU_DB[yunmu]) {
    for (const wrongYunmu of WRONG_YUNMU_DB[yunmu]) {
      const newPinyin = shengmu + wrongYunmu;
      if (isValidPinyin(newPinyin)) {
        options.add(newPinyin);
        if (options.size === 3) return Array.from(options);
      }
    }
  }
  
  // 3. 使用预定义的常见错误组合
  const commonWrongOptions = {
    'zhī': ['zī', 'chī', 'shī'],
    'chī': ['zhī', 'cī', 'shī'],
    'shī': ['zhī', 'chī', 'sī'],
    'rì': ['lì', 'nì', 'zhì'],
    'zī': ['zhī', 'cī', 'sī'],
    'cī': ['zī', 'chī', 'sī'],
    'sī': ['shī', 'zī', 'cī'],
    'bā': ['pā', 'mā', 'fā'],
    'pā': ['bā', 'mā', 'fā'],
    'mā': ['bā', 'pā', 'fā'],
    'fā': ['hā', 'bā', 'pā'],
    'dā': ['tā', 'nā', 'lā'],
    'tā': ['dā', 'nā', 'lā'],
    'nā': ['lā', 'rā', 'dā'],
    'lā': ['nā', 'rā', 'dā'],
    'gā': ['kā', 'hā', 'jā'],
    'kā': ['gā', 'hā', 'jā'],
    'hā': ['fā', 'gā', 'kā'],
    'jī': ['qī', 'xī', 'zhī'],
    'qī': ['jī', 'xī', 'chī'],
    'xī': ['jī', 'qī', 'shī']
  };
  
  if (commonWrongOptions[correctPinyin]) {
    return commonWrongOptions[correctPinyin];
  }
  
  // 4. 如果以上都没有匹配到，使用基础错误选项
  const baseWrongOptions = [
    'zhī', 'chī', 'shī', 'rì', 'zī', 'cī', 'sī',
    'bā', 'pā', 'mā', 'fā', 'dā', 'tā', 'nā', 'lā',
    'gā', 'kā', 'hā', 'jī', 'qī', 'xī'
  ];
  
  for (const option of baseWrongOptions) {
    if (option !== correctPinyin && !options.has(option)) {
      options.add(option);
      if (options.size === 3) break;
    }
  }
  
  return Array.from(options);
};

// 从题库中随机抽取指定数量的题目
export const getRandomQuestions = (database, count, weights) => {
  // 如果没有权重设置，直接随机抽取
  if (!weights || Object.keys(weights).length === 0) {
    return shuffleArray([...database]).slice(0, count);
  }

  // 按类型分组题目
  const questionsByType = {};
  database.forEach(q => {
    if (!questionsByType[q.type]) {
      questionsByType[q.type] = [];
    }
    questionsByType[q.type].push(q);
  });

  // 检查是否有权重为10000的类型（优先类型）
  const priorityType = Object.entries(weights).find(([_, weight]) => weight === 10000)?.[0];
  
  // 如果有优先类型
  if (priorityType) {
    // 获取优先类型的题目
    const priorityQuestions = questionsByType[priorityType] || [];
    
    // 如果优先类型的题目数量不足，从其他类型补充
    if (priorityQuestions.length < count) {
      const remainingCount = count - priorityQuestions.length;
      const otherQuestions = database.filter(q => q.type !== priorityType);
      const selectedOtherQuestions = shuffleArray([...otherQuestions]).slice(0, remainingCount);
      return shuffleArray([...priorityQuestions, ...selectedOtherQuestions]);
    }
    
    // 如果优先类型的题目数量足够，随机抽取指定数量
    return shuffleArray([...priorityQuestions]).slice(0, count);
  }

  // 如果没有优先类型，使用权重抽题
  const validWeights = {};
  let totalWeight = 0;
  Object.entries(weights).forEach(([type, weight]) => {
    if (questionsByType[type]?.length > 0) {
      validWeights[type] = weight;
      totalWeight += weight;
    }
  });

  // 如果总权重为0，直接随机抽取
  if (totalWeight === 0) {
    return shuffleArray([...database]).slice(0, count);
  }

  // 计算每种类型的抽取概率
  const typeProbabilities = {};
  Object.entries(validWeights).forEach(([type, weight]) => {
    typeProbabilities[type] = weight / totalWeight;
  });

  // 根据概率抽取题目
  const selectedQuestions = [];
  const maxAttempts = count * 2; // 设置最大尝试次数
  let attempts = 0;

  while (selectedQuestions.length < count && attempts < maxAttempts) {
    attempts++;
    
    // 根据概率选择类型
    const random = Math.random();
    let cumulativeProbability = 0;
    let selectedType = null;

    for (const [type, probability] of Object.entries(typeProbabilities)) {
      cumulativeProbability += probability;
      if (random <= cumulativeProbability) {
        selectedType = type;
        break;
      }
    }

    // 如果选中了类型且该类型还有题目
    if (selectedType && questionsByType[selectedType].length > 0) {
      // 随机选择一个题目
      const randomIndex = Math.floor(Math.random() * questionsByType[selectedType].length);
      const selectedQuestion = questionsByType[selectedType][randomIndex];
      
      // 将选中的题目从题库中移除，避免重复
      questionsByType[selectedType].splice(randomIndex, 1);
      
      // 如果该类型没有题目了，将其概率设为0
      if (questionsByType[selectedType].length === 0) {
        delete typeProbabilities[selectedType];
        // 重新计算其他类型的概率
        const remainingWeight = Object.entries(validWeights)
          .filter(([type]) => typeProbabilities[type])
          .reduce((sum, [_, weight]) => sum + weight, 0);
        
        if (remainingWeight > 0) {
          Object.keys(typeProbabilities).forEach(type => {
            typeProbabilities[type] = validWeights[type] / remainingWeight;
          });
        }
      }
      
      selectedQuestions.push(selectedQuestion);
    }
  }

  // 如果抽取的题目数量不足，从剩余题目中补充
  if (selectedQuestions.length < count) {
    const remainingQuestions = database.filter(q => !selectedQuestions.includes(q));
    selectedQuestions.push(...shuffleArray(remainingQuestions).slice(0, count - selectedQuestions.length));
  }

  // 打乱最终顺序
  return shuffleArray(selectedQuestions);
}; 