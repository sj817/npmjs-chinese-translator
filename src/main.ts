import { translationRules } from './translations'
import { translateNode } from './translator'

/**
 * NPM 中文翻译助手
 * 将 npmjs.com 和 npmjs.org 网站翻译为中文
 */

// 翻译页面
function translatePage (): void {
  translateNode(document.body)
}

// 监听 DOM 变化
const observer = new MutationObserver((mutations: MutationRecord[]) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        translateNode(node)
      }
    })
  })
})

// 初始化
function init (): void {
  console.log('NPM 中文翻译助手已启动')
  console.log(`已加载 ${translationRules.length} 条翻译规则`)

  // 翻译当前页面
  translatePage()

  // 监听页面变化
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

// 增强的页面加载处理，确保在各种加载情况下都能正常翻译
function initWithRetry (): void {
  // 立即尝试初始化（适用于脚本延迟加载的情况）
  if (document.body) {
    init()
  }

  // DOMContentLoaded 事件（适用于正常加载）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  }

  // load 事件（确保所有资源加载完成后再翻译一次）
  window.addEventListener('load', () => {
    // 延迟一点再翻译，确保动态内容也加载完成
    setTimeout(translatePage, 100)
  })

  // 针对 SPA 应用的路由变化
  let lastUrl = location.href
  const checkUrlChange = (): void => {
    const currentUrl = location.href
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl
      // URL 变化时重新翻译页面
      setTimeout(translatePage, 300)
    }
  }

  // 监听 history API
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  history.pushState = function (...args) {
    originalPushState.apply(history, args)
    checkUrlChange()
  }

  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args)
    checkUrlChange()
  }

  // 监听 popstate 事件（浏览器前进/后退）
  window.addEventListener('popstate', checkUrlChange)
}

// 启动初始化
initWithRetry()
