import { curry } from './curry.js';
import { summon } from './summon.js';

const pipe = (...funcs) => {
	return summon(funcs[0].length, (...args) =>
		funcs.reduce((result, func, idx) => (idx === 0 ? func(...result) : func(result)), args)
	);
};

const compose = (...funcs) => {
	return pipe(...funcs.reverse());
};

const call = curry((fun, args) => {
	return fun.apply(this, args);
});

export { compose, pipe, call };
