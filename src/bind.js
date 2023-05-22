import { summon } from './summon.js';

const _ = { _P: 1 };

const bind = (func, ...args) => {
	const pos = args.reduce((acc, curr, index) => {
		if (curr === _) acc.push(index);
		return acc;
	}, []);
	return summon(func.length - args.length + pos.length, (...a) => {
		const argsFinal = Array.from({ length: func.length }, (v, i) => args[i] || _);
		let j = 0;
		argsFinal.forEach((v, i) => (v === _ ? (argsFinal[i] = a[j++]) : 0));
		return func(...argsFinal);
	});
};

export { _, bind };
