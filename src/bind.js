import { summon } from './summon.js';
import { curry } from './curry.js';
import { _ } from './placeholder.js';

const bind = curry((func, ...args) => {
	if (args.length < func.length) args.push(...new Array(func.length - args.length).fill(_));
	return summon(args.filter((v) => v === _).length, (...a) =>
		func(...args.map((v) => (v === _ ? a.shift() : v)))
	);
});

export { bind };
