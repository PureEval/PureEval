import { Just, Nothing } from "../PureEval.js";
import { curry_any } from "./curry.js";

function _assoc(pos, val, obj) {
    if (Array.isArray(obj)) {
        let arr = [].concat(obj);
        arr[pos] = val;
        return arr;
    }
    let result = {};
    for (let p in obj) result[p] = obj[p];
    result[pos] = val;
    return result;
}
function _shallowCloneObject(pos, obj) {
    if (Number.isInteger(pos) && Array.isArray(obj)) return [].concat(obj);
    let result = {};
    for (let p in obj) result[p] = obj[p];
    return result;
}
function _remove(start, cnt, list) {
    let result = Array.prototype.slice.call(list, 0);
    result.splice(start, cnt);
    return result;
};
function _dissoc(pos, obj) {
    if (Number.isInteger(pos) && Array.isArray(obj)) return _remove(pos, 1, obj);
    let result = {};
    for (let p in obj) result[p] = obj[p];
    delete result[pos];
    return result;
}

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
        let idx = s[0];
        if (s.length > 1) {
            let nextObj = (!Just(a).isNothing() && Object.prototype.hasOwnProperty.call(a, idx)) ? a[idx] : Number.isInteger(path[1]) ? [] : {};
            v = assoc(Array.prototype.slice.call(s, 1), v, nextObj);
        }
        return _assoc(idx, v, a);
    } else return _assoc(s, v, a);
});
const modify = curry_any((s, f, a) => {
    if (Array.isArray(s)) {
        let value = a;
        for (let index in s) {
            if (index == s.length - 1) {
                if (Just(value[s[index]]).isNothing()) return Nothing;
                else value[s[index]] = f(value[s[index]]);
            }
            value = value[s[index]];
        }
    } else {
        if (Just(a[s]).isNothing()) return Nothing;
        else a[s] = f(a[s]);
    }
    return a;
});
let dissoc = curry_any((s, a) => {
    if (Array.isArray(s)) {
        switch (s.length) {
            case 0: return a;
            case 1: return _dissoc(s[0], a);
            default:
                let head = s[0], tail = Array.prototype.slice.call(s, 1)
                if (a[head] == null) return _shallowCloneObject(head, a);
                else return assoc(head, dissoc(tail, a[head]), a);
        }
    } else return _dissoc(s, a);
});
function valuesIn(x) {
    let result = [];
    for (let i in x) result.push(x[i]);
    return x;
}

export { prop, assoc, modify, dissoc, valuesIn };