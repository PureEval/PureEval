import { _ } from './placeholder.js';
import { curry } from './curry.js';

const __boom = (args) =>
	args.reduce((acc, curr) => curr.flatMap((v) => acc.map((w) => [...w, v])), [[]]);

const iterate = (fun, ...args) =>
	__boom(args.map((v) => (Array.isArray(v) ? v : [v]))).map((v) => fun.apply(null, v));

const map = curry((rule, arr) => arr.map(rule));

const flatMap = curry((rule, arr) => arr.flatMap(rule));

const forEach = curry((rule, arr) => arr.forEach(rule));

const reduce = curry((fun, init, arr) => (init !== _ ? arr.reduce(fun, init) : arr.reduce(fun)));

const fold = curry((fun, cnt, init) => {
	while (cnt--) init = fun(init);
	return init;
});

const scan = curry((fun, cnt, init) => Array.from({ length: cnt }, () => (init = fun(init))));

export { iterate, map, flatMap, forEach, reduce, fold, scan };
