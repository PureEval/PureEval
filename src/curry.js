import { summon } from './summon.js';

const curry = (fun) => {
	if (fun.length < 2 || fun.origin) return fun;
	const result = summon(fun.length, (...args) =>
		args.length >= fun.length ? fun.apply(null, args) : curry(fun.bind(null, ...args))
	);
	result.origin = fun;
	return result;
};

const uncurry = (fun) => fun.origin;

export { curry, uncurry };
