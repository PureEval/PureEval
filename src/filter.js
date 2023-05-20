import { curry } from './curry.js';

const filter = curry((rule, arr) => {
	return arr.filter((v) => rule(v));
});

const reject = curry((rule, arr) => {
	return arr.filter((v) => !rule(v));
});

const shied = curry((v, arr) => {
	const values = Array.isArray(v) ? v : [v];
	return arr.filter((val) => !values.includes(val));
});

const choose = curry((v, arr) => {
	const values = Array.isArray(v) ? v : [v];
	return arr.filter((val) => values.includes(val));
});

export { filter, reject, shied, choose };
