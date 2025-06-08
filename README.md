# 工具导航网站

一个现代化的工具导航网站，支持多语言、多主题和响应式设计。

## 功能特点

### 🌍 多语言支持
- 内置中文和英文支持
- 支持动态添加新语言
- 语言设置自动保存
- 支持翻译参数和复数形式

### 🎨 主题系统
- 5种内置主题（浅色、深色、蓝色、绿色、紫色）
- 支持动态添加新主题
- 主题设置自动保存
- 使用CSS变量实现平滑切换

### 📱 响应式设计
- PC端：每行6个工具卡片
- 大屏幕：每行5个工具卡片
- iPad：每行4个工具卡片
- 手机：每行2个工具卡片

### 🔍 搜索功能
- 实时搜索
- 支持工具名称和描述搜索
- 多语言搜索支持
- 搜索结果即时显示

## 快速开始

### 安装
```bash
# 克隆项目
git clone https://github.com/your-username/tool-nav.git

# 进入项目目录
cd tool-nav

# 安装依赖
npm install

# 启动开发服务器
npm start
```

### 构建
```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构
```
src/
├── components/          # 组件目录
│   ├── Navbar/         # 导航栏组件
│   └── ToolCard/       # 工具卡片组件
├── contexts/           # 上下文目录
│   ├── ThemeContext.js # 主题上下文
│   └── LanguageContext.js # 语言上下文
├── locales/            # 语言文件目录
│   ├── zhCN.js        # 中文翻译
│   └── enUS.js        # 英文翻译
├── pages/             # 页面组件
│   ├── Home.js        # 首页
│   └── ToolDetail.js  # 工具详情页
└── App.js             # 应用入口
```

## 开发指南

### 添加新工具
1. 在 `src/pages/Home.js` 中添加工具数据：
```javascript
{
  id: 7,
  nameKey: 'newTool',
  descriptionKey: 'newToolDesc',
  icon: '图标URL'
}
```

2. 添加翻译：
```javascript
// zhCN.js
{
  newTool: '新工具名称',
  newToolDesc: '新工具描述'
}

// enUS.js
{
  newTool: 'New Tool Name',
  newToolDesc: 'New Tool Description'
}
```

### 添加新主题
1. 在 `ThemeContext.js` 中添加主题：
```javascript
{
  id: 'newTheme',
  nameKey: 'newTheme',
  icon: '主题图标'
}
```

2. 在 `App.css` 中添加主题样式：
```css
[data-theme='newTheme'] {
  --primary-color: #颜色代码;
  --secondary-color: #颜色代码;
}
```

3. 添加主题名称翻译：
```javascript
// zhCN.js
{
  newTheme: '新主题名称'
}

// enUS.js
{
  newTheme: 'New Theme Name'
}
```

### 添加新语言
1. 创建语言文件 `src/locales/frFR.js`：
```javascript
export const frFR = {
  id: 'fr',
  name: 'Français',
  translations: {
    // 复制现有翻译并修改
  }
};
```

2. 在 `locales/index.js` 中注册：
```javascript
import { frFR } from './frFR';
export const languages = [zhCN, enUS, frFR];
```

## 使用示例

### 在组件中使用翻译
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};
```

### 使用主题
```javascript
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={() => toggleTheme('dark')}>
      切换主题
    </button>
  );
};
```

## 浏览器支持
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 技术栈
- React 18
- React Router v6
- CSS3 (CSS变量)
- 响应式设计

## 贡献指南
1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证
MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式
- 项目维护者：[Your Name]
- 邮箱：[your.email@example.com]
- 项目链接：[https://github.com/your-username/tool-nav]
