import * as P from './PureEval.js'

const xL=P.Lens.bind(["x",0,"b"]);

console.log(JSON.stringify(P.set(xL,100,{x:[{b:1}]})));