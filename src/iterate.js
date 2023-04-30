import { curry } from './curry.js';

function __boom(args) {
	let now = args.shift().map((x) => [x]);
	args.forEach((v) => {
		now = v.flatMap((u) => now.map((x) => x.concat([u])));
	});
	return now;
}

function iterate(fun, ...args) {
	return __boom(args.map((v) => (Array.isArray(v) ? v : [v]))).map((v) => fun.apply(null, v));
}

const map = curry((rule, arr) => {
	return arr.map((v) => rule(v));
});

const flatMap = curry((rule, arr) => {
	return arr.flatMap(rule);
});

const forEach = curry((rule, arr) => {
	arr.forEach(rule);
});

const reduce = curry((fun, init, arr) => {
	return init != undefined ? arr.reduce(fun, init) : arr.reduce(fun);
});

const fold = curry((fun, cnt, init) => {
	while (cnt--) init = fun(init);
	return init;
});

const scan = curry((init, fun, cnt) => {
	const result = [];
	while (cnt--) result.push((init = fun(init)));
	return result;
});

export { iterate, map, flatMap, forEach, reduce, fold, scan };
