import { curry } from './curry.js'
import { reduce } from './iterate.js';

const either = curry((a, b) => a || b);
const both = curry((a, b) => a && b);
const id = v => v;
const gt = curry((a, b) => a > b);
const gte = curry((a, b) => a >= b);
const lt = curry((a, b) => a < b);
const lte = curry((a, b) => a <= b);
const equal = curry((a, b) => a == b);
const arr_equal = curry((a, b) => {
    return a.length === b.length ? true : reduce((p, c, i) => {
        if (p == false || c != b[i]) return false;
        else return true;
    }, true)(a);
});
const common = v => v;
const always = v => () => v;
const when = curry((a, b) => {
    return function (obj) {
        if (a(obj)) return b();
    }
});
const unless = curry((a, b) => {
    return function (obj) {
        if (!a(obj)) return b();
    }
});
const ifElse = curry((a, b, c) => {
    return function (obj) {
        if (a(obj)) return b();
        else return c();
    }
});
const when_v = curry((a, b) => {
    return function (obj) {
        if (a(obj)) return b(obj);
    }
});
const unless_v = curry((a, b) => {
    return function (obj) {
        if (!a(obj)) return b(obj);
    }
});
const ifElse_v = curry((a, b, c) => {
    return function (obj) {
        if (a(obj)) return b(obj);
        else return c(obj);
    }
});

export { either, both, id, gt, gte, lt, lte, equal, arr_equal, common, always, when, unless, ifElse, when_v, unless_v, ifElse_v };