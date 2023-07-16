import { curry } from './curry.js';
import { _ } from './placeholder.js';

const odd = (v) => (v & 1) === 1;

const even = (v) => (v & 1) === 0;

const add = curry((a, b) => a + b);

const minus = curry((a, b) => a - b);

const mul = curry((a, b) => a * b);

const div = curry((a, b) => a / b);

const divr = curry((a, b) => b / a);

const mod = curry((a, b) => a % b);

const rema = curry((a, b) => ((a % b) + b) % b);

const power = curry((a, b) => a ** b);

const negate = (a) => -a;

const under = () => (a, b) => a < b ? -1 : a > b ? 1 : 0;

const upper = () => (a, b) => a > b ? -1 : a < b ? 1 : 0;

const sort = curry((rule, arr) => arr.sort(rule !== _ ? rule : undefined));

const median = (arr) => {
	const sortedArr = [...arr].sort((a, b) => a - b);
	const mid = Math.floor(sortedArr.length / 2);
	return sortedArr.length % 2 === 1 ? sortedArr[mid] : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
};

const sum = (arr) => arr.reduce(add);

const prod = (arr) => arr.reduce(mul);

const max = (arr) => Math.max(...arr);

const min = (arr) => Math.min(...arr);

const average = (arr) => sum(arr) / arr.length;

const inc = (x) => x + 1;

const dec = (x) => x - 1;

export {
	add,
	average,
	dec,
	div,
	divr,
	even,
	inc,
	max,
	median,
	min,
	minus,
	mod,
	mul,
	negate,
	odd,
	power,
	prod,
	rema,
	sort,
	sum,
	under,
	upper
};
