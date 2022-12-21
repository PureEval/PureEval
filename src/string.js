import { Just, Nothing } from "./abstract/maybe.js";
import { curry_any } from "./curry.js";

const rexMatch = curry_any((rex, str) => str.match(rex));
const rexReplace = curry_any((rex, to, str) => str.replace(rex, to));
const rexTest = curry_any((rex, str) => str.test(rex));
const toString = curry_any(val => Just(val).isNothing() ? Nothing : val.toString());
const split = curry_any((char, str) => str.split(char));
const toLower = v => v.toLowerCase();
const toUpper = v => v.toUpperCase();
const trim = v => v.trim();
const words = str => String(str).toLowerCase().split(/\s|\b/).filter(function alpha(v) { return /^[\w]+$/.test(v) });

export { rexMatch, rexReplace, rexTest, toString, split, toLower, toUpper, trim, words };