import * as assert from 'assert';
import { curry, uncurry } from './PureEval.js';
import { bind, _ } from './PureEval.js';
import { filter, reject, shied, choose } from './PureEval.js';
import { iterate, map, flatMap, forEach, reduce, fold, scan } from './PureEval.js';
import { either, both, not, gt, gte, lt, lte, equal, equalStrict, arrEqual, id, always, when, unless, ifElse } from './PureEval.js';
import { match } from './PureEval.js';

(function main() {
	Curry();
	Bind();
	Filter();
	Iterate();
	Logic();
	Match();
})();

function Curry() {
	describe('Curry', () => {
		describe('curry()', () => {
			it('Base', () => {
				const foo = curry((a, b, c) => a + b + c);
				assert.equal(foo(1)(2)(3), 6);
				assert.equal(foo(1, 2)(3), 6);
			});
			it('Arguments', () => {
				const foo = curry((a, b, c) => a + b + c);
				assert.equal(foo(1)(2).length, 1);
				assert.equal(foo(1).length, 2);
				assert.equal(foo.length, 3);
			});
			it('Performance', () => {
				const foo = curry((a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) => a + z);
				assert.equal(foo(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)(19)(20)(21)(22)(23)(24)(25)(26), 27);
			});
		});
		describe('uncurry()', () => {
			it('Base', () => {
				const foo = curry((a, b, c) => a + b + c);
				assert.equal(uncurry(foo)(1, 2, 3), 6);
				assert.equal(uncurry(foo(1))(2, 3), 6);
			});
			it('Arguments', () => {
				const foo = curry((a, b, c) => a + b + c);
				assert.equal(uncurry(foo).length, 3);
				assert.equal(uncurry(foo(1)).length, 2);
			});
		});
	});
}

function Bind() {
	describe('Bind', () => {
		describe('bind()', () => {
			it('Base', () => {
				const foo = (a, b, c) => a + b + c;
				assert.equal(bind(foo, 1, _, 3)(4), 8);
			});
		});
	});
}

function Filter() {
	describe('Filter', () => {
		describe('filter()', () => {
			it('Base', () => {
				assert.deepEqual(filter((v) => v == 1)([1, 1, 4, 5, 1, 4]), [1, 1, 1]);
			});
		});
		describe('reject()', () => {
			it('Base', () => {
				assert.deepEqual(reject((v) => v == 1)([1, 1, 4, 5, 1, 4]), [4, 5, 4]);
			});
		});
		describe('shied()', () => {
			it('Base', () => {
				assert.deepEqual(shied([1])([1, 1, 4, 5, 1, 4]), [4, 5, 4]);
			});
		});
		describe('choose()', () => {
			it('Base', () => {
				assert.deepEqual(choose([1])([1, 1, 4, 5, 1, 4]), [1, 1, 1]);
			});
		});
	});
}

function Iterate() {
	describe('Iterate', () => {
		describe('iterate()', () => {
			it('Base', () => {
				const foo = (a, b) => [a, b];
				assert.deepEqual(iterate(foo, [1, 2], [6, 7]), [
					[1, 6],
					[2, 6],
					[1, 7],
					[2, 7]
				]);
			});
		});
		describe('map()', () => {
			it('Base', () => {
				assert.deepEqual(map((v) => v + 1)([1, 2, 3]), [2, 3, 4]);
			});
		});
		describe('flatMap()', () => {
			it('Base', () => {
				assert.deepEqual(flatMap((v) => [v, v])([1, 2, 3]), [1, 1, 2, 2, 3, 3]);
			});
		});
		describe('forEach()', () => {
			it('Base', () => {
				const list = [];
				forEach((v) => list.push(v), [1, 2, 3]);
				assert.deepEqual(list, [1, 2, 3]);
			});
		});
		describe('reduce()', () => {
			it('Base', () => {
				assert.equal(
					reduce((a, b) => a + b, 0, [1, 2, 3]),
					6
				);
			});
		});
		describe('fold()', () => {
			it('Base', () => {
				assert.equal(
					fold((v) => v + 1, 5, 0),
					5
				);
			});
		});
		describe('fold()', () => {
			it('Base', () => {
				assert.deepEqual(scan(1)((v) => v + 1)(5), [2, 3, 4, 5, 6]);
			});
		});
	});
}

function Logic() {
	describe('Logic', () => {
		describe('either()', () => {
			it('Base', () => {
				assert.equal(either(true, false), true);
				assert.equal(either(false, false), false);
			});
		});
		describe('both()', () => {
			it('Base', () => {
				assert.equal(both(true, false), false);
				assert.equal(both(true, true), true);
			});
		});
		describe('not()', () => {
			it('Base', () => {
				assert.equal(not(true), false);
				assert.equal(not(false), true);
			});
		});
		describe('lt()', () => {
			it('Base', () => {
				assert.equal(lt(3, 3), false);
				assert.equal(lt(2, 3), true);
			});
		});
		describe('lte()', () => {
			it('Base', () => {
				assert.equal(lte(3, 3), true);
				assert.equal(lte(2, 3), true);
			});
		});
		describe('gt()', () => {
			it('Base', () => {
				assert.equal(gt(3, 3), false);
				assert.equal(gt(3, 2), true);
			});
		});
		describe('gte()', () => {
			it('Base', () => {
				assert.equal(gte(3, 3), true);
				assert.equal(gte(3, 2), true);
			});
		});
		describe('equal()', () => {
			it('Base', () => {
				assert.equal(equal(1, 1), true);
				assert.equal(equal(5)(1), false);
			});
		});
		describe('equalStrict()', () => {
			it('Base', () => {
				assert.equal(equalStrict(1, 1), true);
				assert.equal(equalStrict(5)(1), false);
			});
		});
		describe('id()', () => {
			it('Base', () => {
				assert.equal(id(4), 4);
			});
		});
		describe('always()', () => {
			it('Base', () => {
				assert.equal(always(4)(), 4);
			});
		});
		describe('arrEqual()', () => {
			it('Base', () => {
				assert.equal(arrEqual([1, 2, 3], [3, 2, 1]), false);
			});
			it('EmptyArray', () => {
				assert.equal(arrEqual([], []), true);
			});
		});
		describe('when()', () => {
			it('Base', () => {
				const foo = when(
					(v) => v == ' is you!',
					(v) => 'homo' + v
				);
				assert.equal(foo(' is you!'), 'homo is you!');
			});
		});
		describe('unless()', () => {
			it('Base', () => {
				const foo = unless(
					(v) => !(v == ' is you!'),
					(v) => 'homo' + v
				);
				assert.equal(foo(' is you!'), 'homo is you!');
			});
		});
		describe('ifElse()', () => {
			it('Base', () => {
				const foo = ifElse(
					(v) => v == ' is you!',
					(v) => 'homo' + v,
					(v) => 'homo' + v
				);
				assert.equal(foo(' is you!'), 'homo is you!');
			});
		});
	});
}

function Match() {
	describe('Match', () => {
		describe('match()', () => {
			it('Fibonacci', () => {
				const fib = match(1, 1, 2, 2, _, (v) => fib(v - 1) + fib(v - 2));
				assert.equal(fib(5), 8);
			});
			it('FastSort', () => {
				const sort = match([], [], _, (a, x, s) => [...sort(filter(lte(x), s)), x, ...sort(filter(gt(x), s))]);
				assert.deepEqual(sort([4, 6, 7, 4, 1]), [7, 6, 4, 4, 1]);
			});
		});
	});
}
