import { curry } from './curry.js';
import { summon } from './summon.js';

const pipe = (...funcs) =>
	funcs.length === 1
		? funcs[0]
		: summon(funcs[0].length, (...args) =>
				funcs.reduce(
					(result, func, idx) => (idx === 0 ? func(...result) : func(result)),
					args
				)
		  );

const compose = (...funcs) => pipe(...funcs.reverse());

const call = curry((fun, args) => fun.apply(this, args));

export { compose, pipe, call };
