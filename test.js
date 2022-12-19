import * as P from './PureEval.js';

console.log(P.match(P.Nothing,v=>console.log(111))(P.Nothing))