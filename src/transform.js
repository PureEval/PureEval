import { summon } from './summon.js';
import { curry } from './curry.js';
import { getFunctionLength } from './summon.js';

function compose(...fun) {
	if (fun.length === 0) return (v) => v;
	if (fun.length === 1) return fun[0];
	return summon(
		getFunctionLength(fun[fun.length - 1]),
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
	let f = function () {
		let result = fun.shift().apply(this, arguments);
		return fun.reduce((p, c) => c(p), result);
	};
	return summon(getFunctionLength(fun[0]), f);
}
const call = curry((fun, args) => {
	return fun.apply(this, args);
});

export { compose, pipe, call };
