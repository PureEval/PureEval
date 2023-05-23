import { curry } from './curry.js';

const zipWith = curry((f, a, b) => a.map((x, i) => f(x, b[i])));

const zip = zipWith((a, b) => [a, b]);

const join = curry((s, arr) => arr.join(s));

const slice = curry((start, end, arr) => arr.splice(start, end));

const take = curry((pos, arr) => slice(0, pos, arr));

const takeWhile = curry((f, arr) => {
	const index = arr.findIndex((item) => !f(item));
	return index === -1 ? arr : arr.slice(0, index);
});

const drop = curry((pos, arr) => arr.slice(pos));

const dropWhile = curry((f, arr) => {
	const index = arr.findIndex((item) => !f(item));
	return index === -1 ? [] : arr.slice(index);
});

const allCheck = curry((f, arr) => arr.every(f));

const anyCheck = curry((f, arr) => arr.some(f));

const concat = curry((a, b) => Array.isArray(a) ? a.concat(b) : a + b);

const head = (arr) => arr[0];

const tail = (arr) => arr[arr.length - 1];

const dropHead = (arr) => drop(1, arr);

const dropTail = (arr) => arr.splice(0, arr.length - 1);

const includes = curry((a, b) => b.includes(a));

const reverse = (arr) => arr.reduceRight((acc, cur) => [...acc, cur], []);

export {
	zipWith,
	zip,
	join,
	slice,
	take,
	takeWhile,
	drop,
	dropWhile,
	allCheck,
	anyCheck,
	concat,
	head,
	tail,
	dropHead,
	dropTail,
	includes,
	reverse
};
