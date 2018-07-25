#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const Compiler = require('../lib/Compiler.js')
const root = process.cwd() //当前工作目录
let configPath = path.join(root, 'webpack.config.js')
let config = require(configPath)
// 根据config创建compiler
let compiler = new Compiler(config)
// 发射entryOption事件
compiler.hooks.entryOption.call(config)
compiler.run()
