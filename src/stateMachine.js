import { curry } from './curry.js'
import { fold } from './iterate.js';
import { summon } from './summon.js';
import { compose, pipe } from './transform.js';

const higherPipe = curry((functions, iv) => {
    let processed = [], processedIv = [], firstFunction, firstFunctionIv;
    iv.forEach((value, index) => {
        if (value !== 0) {
            processed.push(functions[index]);
            processedIv.push(value);
        }
    });
    firstFunction = processed.shift(), firstFunctionIv = processedIv.shift();
    if (processed.length === 0) return fold(firstFunction, firstFunctionIv);
    else return summon(firstFunction.length, (...args) =>
        pipe.apply(this, processed.map((value, index) =>
            fold(value, processedIv[index])))
            (firstFunction.len === 1 ? fold(firstFunction, firstFunctionIv, args[0]) : firstFunction(...args)));
});
const higherComp = curry((functions, iv) => {
    let processed = [], processedIv = [], firstFunction, firstFunctionIv;
    iv.forEach((value, index) => {
        if (value !== 0) {
            processed.push(functions[index]);
            processedIv.push(value);
        }
    });
    firstFunction = processed.pop(), firstFunctionIv = processedIv.pop();
    if (processed.length === 0) return fold(firstFunction, firstFunctionIv);
    else return summon(firstFunction.length, (...args) =>
        compose.apply(this, processed.map((value, index) =>
            fold(value, processedIv[index])))
            (firstFunction.len === 1 ? fold(firstFunction, firstFunctionIv, args[0]) : firstFunction(...args)));
});
const coalgebra = curry((seed, next) => () => seed = next(seed));
const stateMachine = curry((seed, functions) => iv => seed = higherPipe(functions, iv)(seed));

export { higherPipe, higherComp, coalgebra, stateMachine };