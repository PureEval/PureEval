/* eslint-disable no-unused-vars */
function summonPre(total, fn) {
	switch (total) {
		case 0:
			return function () {
				return fn.apply(this, arguments);
			};
		case 1:
			return function (a) {
				return fn.apply(this, arguments);
			};
		case 2:
			return function (a, b) {
				return fn.apply(this, arguments);
			};
		case 3:
			return function (a, b, c) {
				return fn.apply(this, arguments);
			};
		case 4:
			return function (a, b, c, d) {
				return fn.apply(this, arguments);
			};
		case 5:
			return function (a, b, c, d, e) {
				return fn.apply(this, arguments);
			};
		case 6:
			return function (a, b, c, d, e, f) {
				return fn.apply(this, arguments);
			};
		case 7:
			return function (a, b, c, d, e, f, g) {
				return fn.apply(this, arguments);
			};
		case 8:
			return function (a, b, c, d, e, f, g, h) {
				return fn.apply(this, arguments);
			};
		case 9:
			return function (a, b, c, d, e, f, g, h, i) {
				return fn.apply(this, arguments);
			};
		case 10:
			return function (a, b, c, d, e, f, g, h, i, j) {
				return fn.apply(this, arguments);
			};
	}
}

function summon(total, fn) {
	if (total < 11) return summonPre(total, fn);
	const summoner = (...args) => fn.apply(null, args);
	Reflect.defineProperty(summoner, 'length', { value: total });
	return summoner;
}

export { summon };
