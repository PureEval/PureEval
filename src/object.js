import { curry_any } from "./curry.js";

const prop = curry_any((s, a) => {
    if (Array.isArray(s)) {
        let value = a;
        for (let index in s)
            value = value[s[index]];
        return value;
    } else return a[s];
});
const assoc = curry_any((s, v, a) => {
    if (Array.isArray(s)) {
        let value = a;
        for (let index in s) {
            if (index == s.length - 1) value[s[index]] = v;
            value = value[s[index]];
        }
    } else a[s] = v;
    return a;
});
function valuesIn(x) {
    let result = [];
    for (let i in x) result.push(x[i]);
    return x;
}

export { prop, assoc, valuesIn };