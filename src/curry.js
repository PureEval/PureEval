import { summon } from './summon.js';

function curry(fun) {
	if (fun.length < 2) return fun;
	const result = summon(fun.length, (...args) =>
		args.length >= fun.length ? fun.call(null, ...args) : curry(fun.bind(null, ...args))
	);
	result.origin = fun;
	return result;
}

function uncurry(fun) {
	return fun.origin;
}

export { curry, uncurry };
