import { curry } from './curry.js';

const odd = (v) => v % 2;

const even = (v) => !(v % 2);

const add = curry((a, b) => a + b);

const minus = curry((a, b) => a - b);

const mul = curry((a, b) => a * b);

const div = curry((a, b) => a / b);

const mod = curry((a, b) => a % b);

const rema = curry((a, b) => {
	const r = a % b;
	return r < 0 ? r + b : r;
});

const power = curry((a, b) => a ** b);

const negate = (a) => -a;

const under = () => (a, b) => a < b ? -1 : a > b ? 1 : 0;

const upper = () => (a, b) => a > b ? -1 : a < b ? 1 : 0;

const sort = curry((rule, arr) => {
	if (rule != undefined) return arr.sort(rule);
	else return arr.sort();
});

function median(arr) {
	const w = 2 - (arr.length & 1),
		x = (arr.length - w) >> 1;
	return average(
		Array.prototype.slice
			.call(arr, 0)
			.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
			.slice(x, x + w)
	);
}

function sum(arr) {
	return arr.reduce((x, y) => x + y);
}

function prod(arr) {
	return arr.reduce((x, y) => x * y);
}

function max(arr) {
	return arr.reduce((x, y) => (x > y ? x : y));
}

function min(arr) {
	return arr.reduce((x, y) => (x < y ? x : y));
}

function average(arr) {
	return sum(arr) / arr.length;
}

function inc(x) {
	return x + 1;
}

function dec(x) {
	return x - 1;
}

export {
	odd,
	even,
	add,
	minus,
	mul,
	div,
	mod,
	rema,
	power,
	sort,
	upper,
	under,
	sum,
	prod,
	negate,
	average,
	median,
	max,
	min,
	inc,
	dec
};
