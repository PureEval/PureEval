# PrueEval

[![](https://img.shields.io/badge/License-GPL-green)](https://github.com/Lampese/PureEval/blob/main/LICENSE) ![](https://img.shields.io/badge/version-v0.2-red) ![](https://img.shields.io/badge/Author-Lampese-success) [![](https://img.shields.io/badge/npm-pureeval-blue.svg)](https://www.npmjs.com/pureeval)

PureEval 因 [VoxelGeometry](https://github.com/CAIMEOX/VoxelGeometry) 项目而生，意在打造一个精巧而强大的 JavaScript 函数式工具包。

PureEval 具有以下特点：
<img align="right" src="https://raw.githubusercontent.com/PureEval/PureEval/main/logo.svg" height="150px" alt="the deno mascot dinosaur standing in the rain">
- 具有独特的非变量绑定式 iterate 策略。
- 支持对任意参数已知函数函数的柯里化。
- 体积小、代码精简，嵌入成本极低。

# Usage

关于 PureEval 的使用文档可见此：[文档](https://PureEval.github.io)。

## CommanJs

### npm

```bash
npm i pureeval
```

```javascript
const P=require("pureeval");
console.log(P.add(1)(114513));//114514
```

### Release

下载最新版 [Release](https://github.com/PureEval/PureEval/releases) 中的 PureEval.common.min.js。

```javascript
const P=require("PureEval.common.min.js")
console.log(P.add(1)(114513));//114514
```

## ECMAScript

下载最新版 [Release](https://github.com/PureEval/PureEval/releases) 中的 PureEval.es.min.js。

```javascript
import * as P from 'PureEval.es.min.js'
console.log(P.add(1)(114513));//114514
```

