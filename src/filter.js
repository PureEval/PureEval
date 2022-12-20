import { curry_any } from "./curry.js";

const filter = curry_any((rule, arr) => {
    return arr.filter(v => {
        return rule(v);
    });
});
const reject = curry_any((rule, arr) => {
    return arr.filter(v => {
        return !rule(v);
    });
});
const shied = curry_any((v, arr) => {
    if (!Array.isArray(v)) v = [v];
    return arr.filter(val => {
        return !v.includes(val);
    });
});
const choose = curry_any((v, arr) => {
    if (!Array.isArray(v)) v = [v];
    return arr.filter(val => {
        return v.includes(val);
    });
});

export { filter, reject, shied, choose };