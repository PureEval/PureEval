import { summon } from './summon.js';

const _ = { _P: 1 };
const bind = (func, ...args) => {
	const pos = args.reduce((acc, curr, index) => {
		if (curr === _) acc.push(index);
		return acc;
	}, []);
	return summon(pos.length, (...a) => {
		const arg = [...args];
		pos.forEach((v) => (arg[v] = a.shift()));
		return func(...arg);
	});
};

export { _, bind };
