import * as P from './PureEval.js';

let test=P.stateMachine(1,[P.add(1),P.add(-1)]);

console.log(test([8,1]));

console.log(test([0,0]));

console.log(test([1,0]));