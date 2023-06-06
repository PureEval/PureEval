import { curry } from './curry.js';

const createArray = (length, callback) => Array.from({ length }, callback);
const createNumberArray = (start, end) => createArray(end - start + 1, (_, i) => start + i);
const createStringArray = (start, end) =>
	createArray(end.charCodeAt() - start.charCodeAt() + 1, (_, i) =>
		String.fromCharCode(start.charCodeAt() + i)
	);

const range = curry((start, end) =>
	typeof start === 'number' && typeof end === 'number'
		? createNumberArray(start, end)
		: typeof start === 'string' && typeof end === 'string'
		? createStringArray(start, end)
		: []
);

export { range };
