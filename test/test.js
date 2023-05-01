import * as assert from 'assert';
import { curry, uncurry } from '../PureEval.js';
import { bind, _ } from '../PureEval.js';
import { filter, reject, shied, choose } from '../PureEval.js';
import { iterate, map, flatMap, forEach, reduce, fold, scan } from '../PureEval.js';
import { either, both, not, gt, gte, lt, lte, equal, equalStrict, arrEqual, id, always, when, unless, ifElse } from '../PureEval.js';
import { match } from '../PureEval.js';
import { odd, even, add, minus, mul, div, mod, rema, power, sort, upper, under, sum, prod, negate, average, median, max, min, inc, dec } from '../PureEval.js';
import { prop, assoc, modify, dissoc, valuesIn, makePair, has } from '../PureEval.js';
import { range } from '../PureEval.js';
import { higherPipe, higherComp, coalgebra, stateMachine } from '../PureEval.js';
import { rexMatch, rexReplace, rexTest, split, toLower, toUpper, trim, words } from '../PureEval.js';
import { compose, pipe, call } from '../PureEval.js';
import {zipWith, zip, join, slice, take, takeWhile, drop, dropWhile, allCheck, anyCheck, concat, head, tail, dropHead, dropTail, includes, reverse} from '../PureEval.js';
import { Data } from '../PureEval.js';
import { Lens, view, set, over } from '../PureEval.js';
import { Just } from '../PureEval.js';

(function main() {
	Curry();
	Bind();
	Filter();
	Iterate();
	Logic();
	Match();
	Math();
	Object();
	Range();
	StateMachine();
	String();
	Transform();
    List();
	Abstract();
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
		describe('scan()', () => {
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

function Math() {
	describe('Math', () => {
		describe('odd()', () => {
			it('Base', () => {
				assert.equal(odd(114514), false);
				assert.equal(odd(114513), true);
			});
		});
		describe('even()', () => {
			it('Base', () => {
				assert.equal(even(114514), true);
				assert.equal(even(114513), false);
			});
		});
		describe('add()', () => {
			it('Base', () => {
				assert.equal(add(1)(2), 3);
				assert.equal(add(6, 6), 12);
			});
		});
		describe('minus()', () => {
			it('Base', () => {
				assert.equal(minus(9)(10), -1);
				assert.equal(minus(6, 6), 0);
			});
		});
		describe('mul()', () => {
			it('Base', () => {
				assert.equal(mul(9)(10), 90);
				assert.equal(mul(6, 6), 36);
			});
		});
		describe('div()', () => {
			it('Base', () => {
				assert.equal(div(50)(2), 25);
				assert.equal(div(6, 6), 1);
			});
		});
		describe('mod()', () => {
			it('Base', () => {
				assert.equal(mod(114514)(1), 0);
				assert.equal(mod(114514, 1), 0);
			});
		});
		describe('rema()', () => {
			it('Base', () => {
				assert.equal(rema(114514)(1), 0);
				assert.equal(rema(114514, 1), 0);
			});
		});
		describe('power()', () => {
			it('Base', () => {
				assert.equal(power(2, 8), 2 ** 8);
				assert.equal(power(2, 8), 2 ** 8);
			});
		});
		describe('negate()', () => {
			it('Base', () => {
				assert.equal(negate(1), -1);
				assert.equal(negate(-1), 1);
			});
		});
		describe('upper()', () => {
			it('Base', () => {
				assert.deepEqual(sort(upper(), [1, 2, 3]), [3, 2, 1]);
			});
		});
		describe('under()', () => {
			it('Base', () => {
				assert.deepEqual(sort(under(), [3, 2, 3]), [2, 3, 3]);
			});
		});
		describe('sort()', () => {
			it('Base', () => {
				assert.deepEqual(sort(under(), [3, 2, 3]), [2, 3, 3]);
			});
		});
		describe('median()', () => {
			it('Base', () => {
				assert.equal(median([1, 2, 3, 4, 5, 6]), 3.5);
			});
		});
		describe('sum()', () => {
			it('Base', () => {
				assert.equal(sum([1, 2, 3, 4, 5, 6]), 21);
			});
		});
		describe('average()', () => {
			it('Base', () => {
				assert.equal(average([1, 2, 3, 4, 5, 6]), 3.5);
			});
		});
		describe('prod()', () => {
			it('Base', () => {
				assert.equal(prod([1, 2, 3, 4, 5, 6]), 720);
			});
		});
		describe('max()', () => {
			it('Base', () => {
				assert.equal(max([1, 1, 4, 5, 1, 4]), 5);
			});
		});
		describe('min()', () => {
			it('Base', () => {
				assert.equal(min([1, 1, 4, 5, 1, 4]), 1);
			});
		});
		describe('inc()', () => {
			it('Base', () => {
				assert.equal(inc(114513), 114514);
			});
		});
		describe('dec()', () => {
			it('Base', () => {
				assert.equal(dec(114514), 114513);
			});
		});
	});
}

function Object() {
	describe('Object', () => {
		describe('prop()', () => {
			it('Base', () => {
				assert.equal(prop('homo', { homo: 114514 }), 114514);
				assert.equal(prop(['inside', 'homo'], { inside: { homo: 114514 } }), 114514);
			});
		});
		describe('assoc()', () => {
			it('Base', () => {
				assert.deepEqual(assoc('homo', 'yeah', { homo: 114514 }), { homo: 'yeah' });
				assert.deepEqual(assoc(['inside', 'homo'], 'yeah', { inside: { homo: 114514 } }), { inside: { homo: 'yeah' } });
			});
		});
		describe('modify()', () => {
			it('Base', () => {
				assert.deepEqual(
					modify('homo', (v) => 'yeah', { homo: 114514 }),
					{ homo: 'yeah' }
				);
				assert.deepEqual(
					modify(['inside', 'homo'], (v) => 'yeah', { inside: { homo: 114514 } }),
					{ inside: { homo: 'yeah' } }
				);
			});
		});
		describe('dissoc()', () => {
			it('Base', () => {
				assert.deepEqual(dissoc('homo', { homo: 114514 }), {});
				assert.deepEqual(dissoc(['inside', 'homo'], { inside: { homo: 114514 } }), { inside: {} });
			});
		});
		describe('valuesIn()', () => {
			it('Base', () => {
				assert.deepEqual(valuesIn({ a: 1, b: 2, c: 3 }), [1, 2, 3]);
			});
		});
		describe('makePair()', () => {
			it('Base', () => {
				assert.deepEqual(
					makePair([
						['c', 'm'],
						['a', 'e'],
						['i', 'o']
					]),
					{ c: 'm', a: 'e', i: 'o' }
				);
			});
		});
		describe('construct()', () => {
			it('Base', () => {
				assert.equal(1, 1);
			});
		});
		describe('has()', () => {
			it('Base', () => {
				assert.equal(has('homo')({ homo: 1 }), true);
			});
		});
	});
}

function Range() {
	describe('Range', () => {
		describe('range()', () => {
			it('Base', () => {
				assert.deepEqual(range(1, 5), [1, 2, 3, 4, 5]);
				assert.deepEqual(range('a')('c'), ['a', 'b', 'c']);
			});
		});
	});
}

function StateMachine() {
	describe('StateMachine', () => {
		describe('higherPipe()', () => {
			it('Base', () => {
				assert.equal(higherPipe([add(1), mul(2)], [5, 1])(1), 12);
			});
		});
		describe('higherComp()', () => {
			it('Base', () => {
				assert.equal(higherComp([mul(2), add(1)], [1, 5])(1), 12);
			});
		});
		describe('coalgebra()', () => {
			it('Base', () => {
				const foo = coalgebra(1, add(1));
				assert.equal(foo(), 2);
				assert.equal(foo(), 3);
			});
		});
		describe('stateMachine()', () => {
			it('Base', () => {
				const foo = stateMachine(1, [add(1), mul(2)]);
				assert.equal(foo([0, 2]), 4);
				assert.equal(foo([2, 0]), 6);
			});
		});
	});
}

function String() {
	describe('String', () => {
		describe('rexMatch()', () => {
			it('Base', () => {
				assert.deepEqual(rexMatch(/([a-z]m)/g, 'homomomo'), ['om', 'om', 'om']);
			});
		});
		describe('rexReplace()', () => {
			it('Base', () => {
				assert.equal(rexReplace('homo', 'nimo', 'homomomo'), 'nimomomo');
			});
		});
		describe('rexTest()', () => {
			it('Base', () => {
				assert.equal(rexTest(/^h/, 'homo'), true);
			});
		});
		describe('split()', () => {
			it('Base', () => {
				assert.deepEqual(split('1', 'ho1mo'), ['ho', 'mo']);
			});
		});
		describe('toLower()', () => {
			it('Base', () => {
				assert.equal(toLower('ABCD'), 'abcd');
			});
		});
		describe('toUpper()', () => {
			it('Base', () => {
				assert.equal(toUpper('abcd'), 'ABCD');
			});
		});
		describe('trim()', () => {
			it('Base', () => {
				assert.equal(trim(' homo '), 'homo');
			});
		});
		describe('words()', () => {
			it('Base', () => {
				assert.deepEqual(words('the boy next door'), ['the', 'boy', 'next', 'door']);
			});
		});
	});
}

function Transform() {
	describe('Transform', () => {
		describe('compose()', () => {
			it('Base', () => {
				const div_and_add = compose(add(1), mul(0.5));
				assert.equal(div_and_add(229026), 114514);
			});
		});
		describe('pipe()', () => {
			it('Base', () => {
				const div_and_add = pipe(mul(0.5), add(1));
				assert.equal(div_and_add(229026), 114514);
			});
		});
		describe('call()', () => {
			it('Base', () => {
				const foo = (a, b) => a + b;
				assert.equal(call(foo, ['114', '514']), '114514');
			});
		});
	});
}

function List(){
    describe('List', () => {
		describe('zipWith()', () => {
			it('Base', () => {
				const f = (a, b) => a + b;
                assert.deepEqual(zipWith(f, [1, 2, 3], [4, 5, 6]),[5, 7, 9])
			});
		});
        describe('zip()', () => {
			it('Base', () => {
                assert.deepEqual(zip([1, 2, 3], [4, 5, 6]), [[1, 4], [2, 5], [3, 6]]);
			});
		});
        describe('join()', () => {
			it('Base', () => {
                assert.equal(join("|", [1, 2, 3]), "1|2|3");
			});
		});
        describe('slice()', () => {
			it('Base', () => {
                assert.deepEqual(slice(0, 3, [1, 2, 3, 4]), [1, 2, 3]);
			});
		});
        describe('take()', () => {
			it('Base', () => {
                assert.deepEqual(take(3, [1, 2, 3, 4]), [1, 2, 3]);
			});
		});
        describe('takeWhile()', () => {
			it('Base', () => {
                assert.deepEqual(takeWhile((v) => v < 3, [1, 1, 4, 5, 1, 4]), [1, 1]);
			});
		});
        describe('drop()', () => {
			it('Base', () => {
                assert.deepEqual(drop(3, [1, 2, 3, 4]), [4]);
			});
		});
        describe('dropWhile()', () => {
			it('Base', () => {
                assert.deepEqual(dropWhile((v) => v < 3, [4, 5, 1, 4]), [4, 5, 1, 4]);
                assert.deepEqual(dropWhile((v) => v < 5, [4, 5, 1, 4]), [5, 1, 4]);
			});
		});
        describe('allCheck()', () => {
			it('Base', () => {
                assert.equal(allCheck((v) => v < 3, [1, 1, 4, 5, 1, 4]), false);
			});
		});
        describe('anyCheck()', () => {
			it('Base', () => {
                assert.equal(anyCheck((v) => v < 3, [1, 1, 4, 5, 1, 4]), true);
			});
		});
        describe('concat()', () => {
			it('Base', () => {
                assert.deepEqual(concat([1, 2, 3], [1, 2, 3]), [1, 2, 3, 1, 2, 3]);
                assert.equal(concat("abc", "def"), "abcdef");
			});
		});
        describe('head()', () => {
			it('Base', () => {
                assert.equal(head([1, 2, 3]), 1);
			});
		});
        describe('tail()', () => {
			it('Base', () => {
                assert.equal(tail([1, 2, 3]), 3);
			});
		});
        describe('dropHead()', () => {
			it('Base', () => {
                assert.deepEqual(dropHead([1, 2, 3]), [2, 3]);
			});
		});
        describe('dropTail()', () => {
			it('Base', () => {
                assert.deepEqual(dropTail([1, 2, 3]), [1, 2]);
			});
		});
        describe('includes()', () => {
			it('Base', () => {
                assert.equal(includes(4)([1, 3, 4]), true);
                assert.equal(includes(5)([1, 3, 4]), false);
			});
		});
        describe('reverse()', () => {
			it('Base', () => {
                assert.deepEqual(reverse([1, 2, 3]), [3, 2, 1]);
			});
		});
	});
}

function Abstract() {
	abstractData();
	abstractOptics();
	abstractMaybe();
}

function abstractData() {
	describe('abstractData', () => {
		describe('Data()', () => {
			it('Maybe', () => {
				const rMaybe = Data('Just a', 'Nothing');
				assert.equal(rMaybe.is.Just(rMaybe.Just(1)), true);
				assert.equal(rMaybe.Just(2).a, 2);
			});
			it('Round', () => {
				const Round = Data('Round x y r');
				const Square = (round) => 3.14 * round.r ** 2;
				assert.equal(Square(Round.Round(1, 1, 5)), 78.5);
			});
		});
	});
}

function abstractOptics() {
	describe('abstractOptics', () => {
		describe('view()', () => {
			it('Base', () => {
				const lens = Lens.bind('a');
				assert.equal(view(lens, { a: 1 }), 1);
			});
		});
		describe('set()', () => {
			it('Base', () => {
				const lens = Lens.bind('a');
				assert.deepEqual(set(lens, 2, { a: 1 }), { a: 2 });
			});
		});
		describe('over()', () => {
			it('Base', () => {
				const lens = Lens.bind('a');
				assert.deepEqual(over(lens, add(1), { a: 1 }), { a: 2 });
			});
		});
	});
}

function abstractMaybe() {
	describe('abstractMaybe', () => {
		describe('Base', () => {
			it('Base', () => {
				assert.equal(
					Just(1)
						.map(add(114513))
						.fold(() => 'Nothing', id),
					114514
				);
				assert.equal(Just(1).chain(add(114513)), 114514);
			});
		});
	});
}
