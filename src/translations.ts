/**
 * 翻译规则配置
 *
 * 支持两种匹配模式：
 * 1. 字符串 - 绝对匹配（精确匹配，推荐）
 * 2. 正则表达式 - 正则匹配（灵活匹配，高级用法）
 *
 * 格式：[匹配规则, 翻译文本]
 * - 匹配规则可以是字符串或正则表达式
 * - 字符串：完全匹配原文
 * - 正则表达式：按正则规则匹配，支持捕获组
 */

/**
 * 翻译规则类型
 * [0]: 匹配规则 - string(绝对匹配) | RegExp(正则匹配)
 * [1]: 翻译文本 - 可使用 $1, $2 等捕获组（仅正则有效）
 */
export type TranslationRule = [string | RegExp, string]

/**
 * 翻译规则列表
 * 执行顺序：从上到下依次匹配
 */
export const translationRules: TranslationRule[] = [
  // ==================== 绝对匹配规则 ====================
  // 格式：[字符串, 翻译文本]
  // 特点：精确匹配，安全可靠，推荐使用

  // www.npmjs.com 主页
  ['Popular libraries', '流行库'],
  ['Discover packages', '发现包'],
  ['By the numbers', '数字统计'],
  ['Search', '搜索'],
  ['Downloads · Last Week', '下载量 · 上周'],
  ['Downloads · Last Month', '下载量 · 上月'],
  ['Front-end', '前端'],
  ['Back-end', '后端'],
  ['CLI', '命令行工具'],
  ['Documentation', '文档'],
  ['Testing', '测试'],
  ['IoT', '物联网'],
  ['Coverage', '覆盖率'],
  ['Mobile', '移动端'],
  ['Frameworks', '框架'],
  ['Robotics', '机器人'],
  ['Math', '数学'],
  ['Recently updated packages', '最近更新的包'],
  ['Support', '支持'],
  ['Help', '帮助'],
  ['Advisories', '公告'],
  ['Status', '状态'],
  ['Contact npm', '联系 npm'],
  ['Company', '公司'],
  ['About', '关于'],
  ['Blog', '博客'],
  ['Press', '新闻'],
  ['Terms & Policies', '条款与政策'],
  ['Policies', '政策'],
  ['Terms of Use', '使用条款'],
  ['Code of Conduct', '行为准则'],
  ['Privacy', '隐私政策'],

  // 导航栏
  ['Packages', '包'],
  ['Search packages', '搜索包'],
  ['Sign Up', '注册'],
  ['Sign In', '登录'],
  ['Pro', '专业版'],
  ['Teams', '团队'],
  ['Pricing', '价格'],

  // 包详情页
  ['Install', '安装'],
  ['Repository', '仓库'],
  ['Homepage', '主页'],
  ['Weekly Downloads', '周下载量'],
  ['Version', '版本'],
  ['License', '许可证'],
  ['Unpacked Size', '解包大小'],
  ['Total Files', '文件总数'],
  ['Issues', '问题'],
  ['Pull Requests', '拉取请求'],
  ['Last publish', '最后发布'],
  ['Collaborators', '协作者'],
  ['Try on RunKit', '在 RunKit 上试用'],
  ['Report malware', '报告恶意软件'],

  // README 相关
  ['Readme', '说明文档'],
  ['MIT', 'MIT 许可证'],
  ['ISC', 'ISC 许可证'],

  // 依赖相关
  ['Dependencies', '依赖'],
  ['Dev Dependencies', '开发依赖'],
  ['Peer Dependencies', '对等依赖'],
  ['Optional Dependencies', '可选依赖'],
  ['Dependents', '依赖者'],

  // 版本相关
  ['Versions', '版本'],
  ['View all', '查看全部'],
  ['latest', '最新'],
  ['beta', '测试版'],
  ['alpha', '预览版'],

  // 搜索相关
  ['Sort by', '排序方式'],
  ['Popularity', '热门'],
  ['Quality', '质量'],
  ['Maintenance', '维护'],
  ['Optimal', '最优'],

  // 包信息
  ['published', '发布于'],
  ['ago', '前'],
  ['Keywords', '关键词'],
  ['Maintainers', '维护者'],

  // 统计信息
  ['downloads in the last day', '最近一天的下载量'],
  ['downloads in the last week', '最近一周的下载量'],
  ['downloads in the last month', '最近一月的下载量'],

  // 其他常用词
  ['Package Health Score', '包健康评分'],
  ['Security', '安全'],
  ['Explore', '探索'],
  ['Products', '产品'],
  ['npm Pro', 'npm 专业版'],
  ['npm Teams', 'npm 团队版'],
  ['npm Enterprise', 'npm 企业版'],
  ['Community', '社区'],
  ['GitHub', 'GitHub'],
  ['Twitter', 'Twitter'],

  // ==================== 正则表达式规则 ====================
  // 格式：[正则表达式, 翻译文本]
  // 特点：灵活匹配，支持捕获组，需谨慎使用
  // 示例：
  // [/(\d+)\s+downloads?/gi, '$1 次下载'],
  // [/(\d+)\s+(day|week|month|year)s?\s+ago/gi, '$1 $2前'],
]

/**
 * 添加翻译规则
 */
export function addTranslationRule (pattern: string | RegExp, translation: string): void {
  translationRules.push([pattern, translation])
}

/**
 * 批量添加翻译规则
 */
export function addTranslationRules (rules: TranslationRule[]): void {
  translationRules.push(...rules)
}
