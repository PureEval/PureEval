import { curry } from './curry.js';

const zipWith = curry((f, a, b) => a.map((x, i) => f(x, b[i])));

const zip = zipWith((a, b) => [a, b]);

const join = curry((s, arr) => arr.join(s));

const slice = curry((start, end, arr) => arr.splice(start, end));

const take = curry((pos, arr) => slice(0, pos, arr));

const takeWhile = curry((f, arr) => {
	const result = [],
		end = arr.length;
	for (let i = 0; i < end; i++) {
		if (!f(arr[i])) {
			break;
		}
		result.push(arr[i]);
	}
	return result;
});

const drop = curry((pos, arr) => arr.slice(pos));

const dropWhile = curry((f, arr) => {
	const result = [],
		end = arr.length;
	let index = 0,
		flag = false;
	while (index < end) {
		if (flag) result.push(arr[index]);
		else if (!f(arr[index])) {
			flag = true;
			result.push(arr[index]);
		}
		++index;
	}
	return result;
});

const allCheck = curry((f, arr) => arr.every(f));

const anyCheck = curry((f, arr) => arr.some(f));

const concat = curry((a, b) => {
	if (Array.isArray(a)) return a.concat(b);
	else return a + b;
});

const head = (arr) => arr[0];

const tail = (arr) => arr[arr.length - 1];

const dropHead = (arr) => drop(1, arr);

const dropTail = (arr) => arr.splice(0, arr.length - 1);

const includes = curry((a, b) => b.includes(a));

function reverse(arr) {
	const result = [];
	let end = arr.length - 1;
	while (end >= 0) {
		result.push(arr[end]);
		--end;
	}
	return result;
}

export {
	zipWith,
	zip,
	join,
	slice,
	take,
	takeWhile,
	drop,
	dropWhile,
	allCheck,
	anyCheck,
	concat,
	head,
	tail,
	dropHead,
	dropTail,
	includes,
	reverse
};
