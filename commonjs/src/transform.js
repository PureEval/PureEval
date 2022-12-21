import { summon } from "./summon.js"
import { curry_any, uncurry } from './curry.js'

function compose(...fun) {
    if (fun.length === 1) return fun[0];
    return summon(fun[fun.length - 1].length, fun.reduce((a, b) => (...args) => a(b(...args))));
}
function pipe(...fun) {
    if (fun.length == 1) return fun[0];
    let f = function () {
        let result = fun.shift().apply(this, arguments);
        return fun.reduce((p, c) => c(p), result);
    }
    return summon(fun[0].length, f);
}
const call = curry_any((fun, args) => {
    return fun.apply(this, args);
});

export { compose, pipe, call };