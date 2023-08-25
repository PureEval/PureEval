/* eslint-disable no-unused-vars */
import { curry } from './curry.js';
import { _ } from './placeholder.js';

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

const when = curry((a, b) => (obj) => a(obj) ? b(obj) : obj);

const unless = curry((a, b) => (obj) => !a(obj) ? b(obj) : obj);

const ifElse = curry((a, b, c) => (obj) => a(obj) ? b(obj) : c(obj));

const deepEqual = curry((a, b) => {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a !== 'object' || a === null || b === null) return false;
	const keysA = Object.keys(a),
		keysB = Object.keys(b);
	return (
		keysA.length === keysB.length &&
		keysA.every((key) => keysB.includes(key) && (deepEqual(a[key], b[key]) || a[key] === _))
	);
});

const __deepEqualData = curry((a, b) => {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a !== 'object' || a === null || b === null) return false;
	const keysA = Object.keys(a),
		keysB = Object.keys(b);
	return (
		keysA.length === keysB.length &&
		keysA.every(
			(key) =>
				key === 'show' ||
				(keysB.includes(key) && (deepEqual(a[key], b[key]) || a[key] === _))
		)
	);
});

const eqType = curry((a, b) => typeof a === typeof b);

const eqData = curry((a, b) => {
	if (a.type !== b.type) return false;
	const { args: _, type: __, ...restA } = a,
		{ args: ___, type: ____, ...restB } = b;
	return __deepEqualData(restA, restB);
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
	deepEqual,
	id,
	always,
	when,
	unless,
	ifElse,
	eqType,
	eqData
};
