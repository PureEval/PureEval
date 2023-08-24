import { curry } from './curry.js';
import { _ } from './placeholder.js';

const __boom = (args) =>
	args.reduce((acc, curr) => curr.flatMap((v) => acc.map((w) => [...w, v])), [[]]);

const iterate = (fun, ...args) =>
	__boom(args.map((v) => (Array.isArray(v) ? v : [v]))).map((v) => fun.apply(null, v));

const map = curry((rule, arr) => arr.map((v, idx, arr) => rule(v, idx, arr)));

const flatMap = curry((rule, arr) => arr.flatMap((v, idx, arr) => rule(v, idx, arr)));

const forEach = curry((rule, arr) => arr.forEach((v, idx, arr) => rule(v, idx, arr)));

const reduce = curry((fun, init, arr) => (init !== _ ? arr.reduce(fun, init) : arr.reduce(fun)));

const fold = curry((fun, cnt, init) => {
	while (cnt--) init = fun(init);
	return init;
});

const scan = curry((fun, cnt, init) => Array.from({ length: cnt }, () => (init = fun(init))));

export { flatMap, fold, forEach, iterate, map, reduce, scan };
