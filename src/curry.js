import { summon } from './summon.js';

function curry(fun) {
	if (fun.length < 2) return fun;
	const result = summon(fun.length, (...args) => {
		if (args.length >= fun.length) return fun.call(null, ...args);
		else return curry(fun.bind(null, ...args));
	});
	result.origin = fun;
	return result;
}

function uncurry(fun) {
	return fun.origin;
}

export { curry, uncurry };
