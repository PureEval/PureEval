import { add, mul, higherPipe } from './PureEval.js';

console.log(higherPipe([add(1), mul(2)], [5, 1])(1));
