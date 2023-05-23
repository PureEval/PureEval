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

const deepEqual = curry((a, b) => {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a !== 'object' || a === null || b === null) return false;
	const keysA = Object.keys(a),
		keysB = Object.keys(b);
	if (keysA.length !== keysB.length) return false;
	return keysA.every((key) => keysB.includes(key) && deepEqual(a[key], b[key]));
});

const when = curry((a, b) => (obj) => a(obj) ? b(obj) : obj);

const unless = curry((a, b) => (obj) => !a(obj) ? b(obj) : obj);

const ifElse = curry((a, b, c) => (obj) => a(obj) ? b(obj) : c(obj));

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
	deepEqual,
	id,
	always,
	when,
	unless,
	ifElse
};
