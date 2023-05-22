import { summon } from './summon.js';

const _ = { _P: 1 };
const bind = (func, ...args) => {
	if (args.length < func.length)
		args = args.concat(new Array(func.length - args.length + 1).fill(_));
	const pos = args.reduce((acc, curr, index) => (curr === _ ? [...acc, index] : acc), []);
	return summon(pos.length, (...a) => func(...args.map((v) => (v === _ ? a.shift() : v))));
};

export { _, bind };
