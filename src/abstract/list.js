import { curry } from '../curry.js';
import { includes } from '../list.js';

const iter = (xs) => xs();
const seq = (xs) => [...xs()];
const head = (xs) => xs().next().value;
const isEmpty = (xs) => xs().next().done === true;

const range = curry(
	(start, end, step) =>
		function* () {
			do {
				yield start;
				start = step(start);
			} while (start != end);
			yield end;
		}
);

const lazy = (xs) =>
	function* () {
		for (const x of xs) yield x;
	};

const tail = (xs) =>
	function* () {
		let flag = false;
		for (const x of iter(xs)) {
			if (flag) yield x;
			else flag = true;
		}
	};

const iterate = curry(
	(f, d) =>
		function* () {
			for (let x = d; ; x = f(x)) yield x;
		}
);

const map = curry(
	(f, xs) =>
		function* () {
			for (const x of iter(xs)) yield f(x);
		}
);

const flatMap = curry(
	(f, xs) =>
		function* () {
			for (const x of iter(xs)) for (const y of iter(f(x))) yield y;
		}
);

const concat = curry(
	(xsa, xsb) =>
		function* () {
			for (const x of iter(xsa)) yield x;
			for (const x of iter(xsb)) yield x;
		}
);

const take = curry(
	(n, xs) =>
		function* () {
			for (const x of iter(xs)) {
				if (n > 0) {
					n--;
					yield x;
				} else return;
			}
		}
);

const drop = curry(
	(n, xs) =>
		function* () {
			for (const x of iter(xs)) {
				if (n > 0) {
					n--;
				} else yield x;
			}
		}
);

const repeat = (x) =>
	function* () {
		while (1) yield x;
	};

const filter = curry(
	(rule, xs) =>
		function* () {
			for (const x of iter(xs)) if (rule(x)) yield x;
		}
);

const reject = curry(
	(rule, xs) =>
		function* () {
			for (const x of iter(xs)) if (!rule(x)) yield x;
		}
);

const forEach = curry((rule, xs) => {
	for (const x of iter(xs)) rule(x);
});

const takeWhile = curry(
	(rule, xs) =>
		function* () {
			for (const x of iter(xs)) {
				if (rule(x)) yield x;
				break;
			}
		}
);

const dropWhile = curry(
	(rule, xs) =>
		function* () {
			let flag = true;
			for (const x of iter(xs)) {
				if (rule(x) && flag === true) continue;
				else {
					flag = false;
					yield x;
				}
			}
		}
);

const zipWith = curry(
	(f, xa, xb) =>
		function* () {
			const xsa = iter(xa),
				xsb = iter(xb);
			for (const x of xsa) {
				const iter_y = xsb.next();
				if (iter_y.done === true) break;
				yield f(x, iter_y.value);
			}
		}
);

const shield = curry((v, xs) => reject(includes(v), xs));

const choose = curry((v, xs) => filter(includes(v), xs));

export { seq, head, isEmpty, range, lazy, tail, iterate, map, flatMap, choose, dropWhile, take, takeWhile, zipWith, drop, filter, reject, repeat, shield, forEach, concat, includes };
