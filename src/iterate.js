import { uncurry, curry } from './curry.js';

function __boom(args) {
	let now = args.shift().map((x) => [x]),
		upper = [];
	args.forEach((v) => {
		v.forEach((u) => now.forEach((x) => upper.push([...x, u])));
		now = [...upper];
		upper = [];
	});
	return now;
}

function iterate(fun, ...args) {
	const uncurryed = fun.curryed === true ? uncurry(fun) : fun;
	const iterateList = [],
		result = [];
	args.forEach((v) => iterateList.push(Array.isArray(v) ? v : [v]));
	__boom(iterateList).forEach((v) => result.push(uncurryed.apply(null, v)));
	return result;
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
