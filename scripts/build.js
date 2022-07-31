const { defineConfig, build } = require('vite')
const path = require('path')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')

// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 输出目录
const outputDir = path.resolve(__dirname, '../build')

// rollup配置
const rollupOptions = {
  // 外置
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

// 创建package.json文件
const createPackageJson = () => {
  const fileStr = `{
    "name": "sheep-ui",
    "version": "0.0.0",
    "main": "sheep-ui.umd.js",
    "module": "sheep-ui.es.js",
    "author": "王棋",
    "description": "",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/WangqiCode/sheep-ui"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC"
  }`

  fsExtra.outputFile(path.resolve(outputDir, 'package.json'), fileStr, 'utf-8')
}

// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'sheep-ui',
          fileName: 'sheep-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
  // 生成package.json
  createPackageJson()
}

const buildLib = async () => {
  await buildAll()
}
buildLib()
