import { curry } from './curry.js';

const rexMatch = curry((rex, str) => str.match(rex));

const rexReplace = curry((rex, to, str) => str.replace(rex, to));

const rexTest = curry((rex, str) => rex.test(str));

const split = curry((char, str) => str.split(char));

const toLower = (v) => v.toLowerCase();

const toUpper = (v) => v.toUpperCase();

const trim = (v) => v.trim();

const words = (str) => {
	const regex = /^[\w]+$/;
	return String(str)
		.split(/\s|\b/)
		.filter((v) => regex.test(v));
};

export { rexMatch, rexReplace, rexTest, split, toLower, toUpper, trim, words };
