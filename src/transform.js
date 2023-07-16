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

const call = curry((fun, args) => fun.apply(null, args));

const andthen = curry((f, p) => p.then(f));

const tryCatch = curry((tryer, reject) => {
	return curry(
		summon(tryer.length, (...args) => {
			try {
				return tryer(...args);
			} catch (e) {
				return reject(e, ...args);
			}
		})
	);
});

export { compose, pipe, call, andthen, tryCatch };
