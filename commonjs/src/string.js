import { Just, Nothing } from "./abstract/maybe.js";
import { curry } from "./curry.js";

const rexMatch = curry((rex, str) => str.match(rex));
const rexReplace = curry((rex, to, str) => str.replace(rex, to));
const rexTest = curry((rex, str) => str.test(rex));
const toString = curry(val => Just(val).isNothing() ? Nothing : val.toString());
const split = curry((char, str) => str.split(char));
const toLower = v => v.toLowerCase();
const toUpper = v => v.toUpperCase();
const trim = v => v.trim();
const words = str => String(str).toLowerCase().split(/\s|\b/).filter(function alpha(v) { return /^[\w]+$/.test(v) });

export { rexMatch, rexReplace, rexTest, toString, split, toLower, toUpper, trim, words };