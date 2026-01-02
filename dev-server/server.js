import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const app = express()
const PORT = 5678

// 启动 Vite watch 模式
console.log('🔨 启动 Vite watch 模式...')
const viteProcess = spawn('pnpm', ['build', '--watch'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true,
})

viteProcess.on('error', (error) => {
  console.error('❌ Vite 启动失败:', error)
})

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n👋 正在关闭服务...')
  viteProcess.kill()
  process.exit(0)
})

// 静态文件服务
app.use(express.static(__dirname))

// 获取最新脚本信息
app.get('/script/latest', (req, res) => {
  const scriptPath = path.join(rootDir, 'dist', 'npmjs-chinese-translator.user.js')

  try {
    const stats = fs.statSync(scriptPath)
    res.json({
      exists: true,
      modified: stats.mtimeMs,
      size: stats.size,
    })
  } catch (error) {
    res.json({
      exists: false,
      modified: 0,
    })
  }
})

// 获取脚本内容(用于安装) - 必须以 .user.js 结尾才能被 Tampermonkey 识别
app.get('/npmjs-chinese-translator.user.js', (req, res) => {
  const scriptPath = path.join(rootDir, 'dist', 'npmjs-chinese-translator.user.js')

  try {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    // 禁用所有缓存,确保每次都获取最新版本
    res.setHeader('Content-Type', 'text/javascript; charset=UTF-8')
    res.setHeader('Content-Disposition', 'inline; filename="npmjs-chinese-translator.user.js"')
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.send(content)
  } catch (error) {
    res.status(404).send('脚本文件未找到,请先运行 Vite 构建')
  }
})

// 启动服务器
app.listen(PORT, () => {
  console.log('')
  console.log('🚀 开发服务器已启动!')
  console.log('')
  console.log(`   访问: http://localhost:${PORT}`)
  console.log('')
  console.log('💡 使用方法:')
  console.log('   1. 修改 src/ 下的文件并保存')
  console.log('   2. Vite 会自动重新构建到 dist/')
  console.log('   3. 在网页上点击 "安装最新版本" (不走缓存)')
  console.log('   4. 刷新 npmjs.com 查看效果')
  console.log('')
  console.log('按 Ctrl+C 停止所有服务')
  console.log('')
})
