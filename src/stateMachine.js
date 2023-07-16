/* eslint-disable no-unexpected-multiline */
import { curry } from './curry.js';
import { fold } from './iterate.js';
import { summon } from './summon.js';
import { pipe } from './transform.js';

const higherPipe = curry((functions, iv) => {
	const processed = iv
		.map((value, index) => (value !== 0 ? functions[index] : null))
		.filter(Boolean);
	const idx = iv.map((value) => (value !== 0 ? value : null)).filter(Boolean);
	return summon(
		processed[0].length,
		pipe(...processed.map((value, index) => fold(value, idx[index])))
	);
});

const higherComp = curry((functions, iv) =>
	higherPipe([...functions].reverse(), [...iv].reverse())
);

const coalgebra = curry((seed, next) => () => (seed = next(seed)));

const stateMachine = curry((seed, functions) => {
	const construct = higherPipe(functions);
	return (iv) => (seed = construct(iv)(seed));
});

export { higherPipe, higherComp, coalgebra, stateMachine };
