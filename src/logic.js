import { curry } from './curry.js';

const either = curry((a, b) => a || b);

const both = curry((a, b) => a && b);

const not = (v) => !v;

const gt = curry((a, b) => a > b);

const gte = curry((a, b) => a >= b);

const lt = curry((a, b) => a < b);

const lte = curry((a, b) => a <= b);

const equal = curry((a, b) => a == b);

const equalStrict = curry((a, b) => a === b);

const id = (v) => v;

const always = (v) => () => v;

const arrEqual = curry((a, b) => {
	if (a.length !== b.length) {
		return false;
	}
	return a.every((val, index) => val === b[index]);
});

const when = curry((a, b) => {
	return (obj) => {
		if (a(obj)) return b(obj);
		return obj;
	};
});

const unless = curry((a, b) => {
	return (obj) => {
		if (!a(obj)) return b(obj);
		return obj;
	};
});

const ifElse = curry((a, b, c) => {
	return (obj) => {
		if (a(obj)) return b(obj);
		else return c(obj);
	};
});

export {
	either,
	both,
	not,
	gt,
	gte,
	lt,
	lte,
	equal,
	equalStrict,
	arrEqual,
	id,
	always,
	when,
	unless,
	ifElse
};
