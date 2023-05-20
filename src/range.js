import { curry } from './curry.js';

const range = curry((start, end) => {
	if (typeof start === 'number' && typeof end === 'number') {
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	} else if (typeof start === 'string' && typeof end === 'string') {
		const l = start.charCodeAt(),
			r = end.charCodeAt();
		return Array.from({ length: r - l + 1 }, (_, i) => String.fromCharCode(l + i));
	}
});

export { range };
