import { summon } from './summon.js';

const curry = (fun) => {
	if (fun.length < 2) return fun;
	const result = summon(fun.length, (...args) =>
		args.length >= fun.length ? fun.call(null, ...args) : curry(fun.bind(null, ...args))
	);
	result.origin = fun;
	return result;
};

const uncurry = (fun) => fun.origin;

export { curry, uncurry };
