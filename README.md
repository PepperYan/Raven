# React 学习项目 Raven

## 简介

该项目用于学习React原理,没什么testcase所以不建议生产使用

## 如何运行

本项目依赖`restackx-cli`脚手架, 请使用 `restackx-cli` 2.x版本因为未在1.x版本进行测试

```
npm i -g restackx-cli
cd ${projectfolder}
npm i
npm start
```

## todolist

以下是该框架实现了的功能列表(可能不全)

- [√] element tree
  - [√] create element tree
  - [√] tag for text node
- [√] mounting
  - [√] dom node
  - [√] reconciler
    - [√] basic reconciler for tree
    - [] flatten element
- [√] state
  - [√] basic state (sync)
  - [√] props recursion
  - [√] partial update
  - [] batch update
- [√] event
  - [√] basic binding (直接绑定在dom)
  - [] global event control (使用全局事件捕获)
  - [] event queue
- [√] component
  - [√] basic component 
  - [] pure component
  - [] complete life cycle
- [] fiber support
  - [] async udpate & queque
- [] context support
- [] refs

