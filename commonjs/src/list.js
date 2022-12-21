import { curry_any } from "./curry.js";

const zipWith = curry_any((f, a, b) => {
    let result = [], index = 0, end = Math.min(a.length, b.length);
    while (index < end) {
        result.push(f(a[index], b[index]));
        ++index;
    }
    return result;
});
const zip = zipWith((a, b) => [a, b]);
const join = curry_any((s, arr) => arr.join(s));
const slice = curry_any((start, end, arr) => arr.splice(start, end));
const take = curry_any((pos, arr) => slice(0, pos - 1, arr));
const takeWhile = curry_any((f, arr) => {
    let result = [], index = 0, end = arr.length;
    while (index < end) {
        if (f(arr[index])) result.push(arr[index]);
        else break;
        ++index;
    }
    return result;
});
const drop = curry_any((pos, arr) => arr.slice(pos));
const dropWhile = curry_any((f, arr) => {
    let result = [], index = 0, end = arr.length, flag = false;
    while (index < end) {
        if (flag) result.push(arr[index]);
        else if (!f(arr[index])) {
            flag = true;
            result.push(arr[index]);
        }
        ++index;
    }
    return result;
});
const check = curry_any((f, arr) => {
    let index = 0, end = arr.length;
    while (index < end) {
        if (!f(arr[index])) return false;
        ++index;
    }
    return true;
});
const concat = curry_any((a, b) => {
    if (Array.isArray(a)) return a.concat(b);
    else return a + b;
});
function reverse(arr) {
    let result = [], end = arr.length - 1;
    while (end >= 0) {
        result.push(arr[end]);
        --end;
    }
    return result;
}

export { zipWith, zip, join, slice, take, takeWhile, drop, dropWhile, check, concat, reverse };