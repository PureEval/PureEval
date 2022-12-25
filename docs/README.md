# PrueEval

[![](https://img.shields.io/badge/License-GPL-green)](https://github.com/Lampese/PureEval/blob/main/LICENSE) ![](https://img.shields.io/badge/version-v1.0-red) [![](https://img.shields.io/badge/npm-pureeval-blue.svg)](https://www.npmjs.com/pureeval)

[Github存储库](https://github.com/Lampese/PureEval)

PureEval 因 [VoxelGeometry](https://github.com/CAIMEOX/VoxelGeometry) 项目而生，意在打造一个精巧而强大的 JavaScript 函数式工具包。

PureEval 具有以下特点：

- 支持对任意参数函数的柯里化。

- 拥有可用的 Monad 单子和 optics 组件。

- 拥有独特的非变量绑定式 iterate 策略。

- 拥有一套美妙且实用的状态机体系。

- 体积小、代码精简，嵌入成本极低。

# Usage

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
