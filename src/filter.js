import { curry } from './curry.js';

const filter = curry((rule, arr) => {
	return arr.filter((v) => rule(v));
});

const reject = curry((rule, arr) => {
	return arr.filter((v) => !rule(v));
});

const shied = curry((v, arr) => {
	if (!Array.isArray(v)) v = [v];
	return arr.filter((val) => !v.includes(val));
});

const choose = curry((v, arr) => {
	if (!Array.isArray(v)) v = [v];
	return arr.filter((val) => v.includes(val));
});

export { filter, reject, shied, choose };
