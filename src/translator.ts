import { translationRules } from './translations'

/**
 * 翻译文本
 * 遍历翻译规则列表，按顺序匹配：
 * 1. 字符串规则 - 绝对匹配（完全相等）
 * 2. 正则表达式规则 - 正则匹配（支持捕获组）
 */
export function translateText (text: string): string {
  const trimmedText = text.trim()

  // 遍历所有翻译规则
  for (const [pattern, translation] of translationRules) {
    if (typeof pattern === 'string') {
      // 字符串规则：绝对匹配
      if (trimmedText === pattern) {
        return translation
      }
    } else {
      // 正则表达式规则：正则匹配
      if (pattern.test(trimmedText)) {
        return trimmedText.replace(pattern, translation)
      }
    }
  }

  // 没有匹配的规则，返回原文
  return text
}

/**
 * 翻译 DOM 节点
 */
export function translateNode (node: Node): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const originalText = node.textContent?.trim()
    if (originalText && originalText.length > 0) {
      const translatedText = translateText(originalText)
      if (translatedText !== originalText && node.textContent) {
        node.textContent = node.textContent.replace(originalText, translatedText)
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement

    // 跳过脚本、样式和代码块
    if (['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(element.tagName)) {
      return
    }

    // 翻译属性
    translateAttributes(element)

    // 递归处理子节点
    node.childNodes.forEach(child => translateNode(child))
  }
}

/**
 * 翻译元素属性
 */
export function translateAttributes (element: HTMLElement): void {
  if (element instanceof HTMLInputElement && element.placeholder) {
    element.placeholder = translateText(element.placeholder)
  }

  if (element.title) {
    element.title = translateText(element.title)
  }

  if (element instanceof HTMLImageElement && element.alt) {
    element.alt = translateText(element.alt)
  }
}

/**
 * 批量翻译元素列表
 */
export function translateElements (elements: NodeList | HTMLElement[]): void {
  elements.forEach(element => translateNode(element))
}
