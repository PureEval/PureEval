import { curry } from './curry.js';
import { reduce } from './iterate.js';

const either = curry((a, b) => a || b);

const both = curry((a, b) => a && b);

const not = (v) => !v;

const gt = curry((a, b) => a > b);

const gte = curry((a, b) => a >= b);

const lt = curry((a, b) => a < b);

const lte = curry((a, b) => a <= b);

const equal = curry((a, b) => a == b);

const id = (v) => v;

const always = (v) => () => v;

const arrEqual = curry((a, b) => {
	return a.length === b.length
		? true
		: reduce((p, c, i) => {
				if (p == false || c != b[i]) return false;
				else return true;
		  }, true)(a);
});

const when = curry((a, b) => {
	return function (obj) {
		if (a(obj)) return b(obj);
		return obj;
	};
});

const unless = curry((a, b) => {
	return function (obj) {
		if (!a(obj)) return b(obj);
		return obj;
	};
});

const ifElse = curry((a, b, c) => {
	return function (obj) {
		if (a(obj)) return b(obj);
		else return c(obj);
	};
});

export { either, both, not, gt, gte, lt, lte, equal, arrEqual, id, always, when, unless, ifElse };
