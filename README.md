# NPM 中文翻译助手

[![CI](https://github.com/sj817/npmjs-chinese-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/sj817/npmjs-chinese-translator/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个将 npmjs.com 网站界面翻译为中文的油猴 (Tampermonkey) 脚本。

## ✨ 功能特性

- 🌐 自动翻译 NPM 官网界面文本
- 🎯 绝对匹配模式，只翻译完全匹配的词汇，避免误触发
- ⚡ 实时监听页面变化，自动翻译新内容
- 🔒 保留代码块、命令行等技术内容不翻译
- 🚀 轻量级，不影响页面性能
- 📱 支持 SPA 路由变化检测

## 📦 安装

### 1. 安装 Tampermonkey 扩展

- [Chrome / Edge](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- [Safari](https://apps.apple.com/app/tampermonkey/id1482490089)

### 2. 安装脚本

点击下方链接直接安装（始终指向最新版本）：

**[📥 点击安装脚本](https://github.com/sj817/npmjs-chinese-translator/releases/latest/download/npmjs-chinese-translator.user.js)**

或者访问 [Releases 页面](https://github.com/sj817/npmjs-chinese-translator/releases) 下载特定版本。

### 3. 使用

访问 [npmjs.com](https://www.npmjs.com) 即可看到中文翻译效果！

## 🔧 自定义翻译

所有翻译规则配置在 [src/translations.ts](src/translations.ts) 中：

```typescript
// 字符串规则 - 精确匹配（推荐）
['Search', '搜索'],
['Install', '安装'],

// 正则表达式规则 - 灵活匹配
[/(\d+)\s+downloads?/gi, '$1 次下载'],
```

## 🛠️ 开发

```bash
# 安装依赖
pnpm install

# 开发模式（Vite + 热更新服务器）
pnpm dev:server

# 构建
pnpm build
```

### 项目结构

```text
├── src/
│   ├── main.ts           # 主入口
│   ├── translations.ts   # 翻译规则
│   └── translator.ts     # 翻译核心逻辑
├── dev-server/           # 开发服务器
├── vite.config.ts        # Vite 配置
└── package.json
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

[MIT](LICENSE) © shijin

---

⭐ 如果这个项目对你有帮助，请给个 Star！
