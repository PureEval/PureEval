import { summon } from './summon.js';
import { curry } from './curry.js';

function compose(...fun) {
	if (fun.length === 0) return (v) => v;
	if (fun.length === 1) return fun[0];
	return summon(
		fun[fun.length - 1].length,
		fun.reduce(
			(a, b) =>
				(...args) =>
					a(b(...args))
		)
	);
}

function pipe(...fun) {
	if (fun.length === 0) return (v) => v;
	if (fun.length === 1) return fun[0];
	const f = function () {
		const result = fun.shift().apply(this, arguments);
		return fun.reduce((p, c) => c(p), result);
	};
	return summon(fun[0].length, f);
}

const call = curry((fun, args) => {
	return fun.apply(this, args);
});

export { compose, pipe, call };
