import * as assert from 'assert';
import { curry, uncurry } from './PureEval.js';
import { bind, _ } from './PureEval.js';
import { filter, reject, shied, choose } from './PureEval.js';

(function main() {
	Curry();
	Bind();
	Filter();
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
			it('performance', () => {
				const foo = curry((a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) => a + z);
                assert.equal(foo(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)(19)(20)(21)(22)(23)(24)(25)(26),27)
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
