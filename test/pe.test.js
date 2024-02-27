import * as fc from 'fast-check';
import * as P from '../PureEval.js';

describe('Logic', () => {
	it('logic and', () => {
		fc.assert(fc.property(fc.boolean(), fc.boolean(), (a, b) => (a && b) === P.both(a, b)));
	});

	it('logic or', () => {
		fc.assert(fc.property(fc.boolean(), fc.boolean(), (a, b) => (a || b) === P.either(a, b)));
	});

	it('logic not', () => {
		fc.assert(fc.property(fc.boolean(), (b) => !b === P.not(b)));
	});

	it('less then', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a < b === P.lt(a, b)));
	});

	it('great than', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a > b === P.gt(a, b)));
	});

	it('less than or equal', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a <= b === P.lte(a, b)));
	});

	it('great than or equal', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a >= b === P.gte(a, b)));
	});

	it('equal', () => {
		fc.assert(fc.property(fc.array(fc.anything()), (a, b) => (a == b) === P.equal(a, b)));
	});

	it('strict equal', () => {
		fc.assert(
			fc.property(fc.anything(), fc.anything(), (a, b) => (a === b) === P.equalStrict(a, b))
		);
	});

	it('identity', () => {
		fc.assert(fc.property(fc.anything(), (a) => a === P.id(a)));
	});

	it('constant', () => {
		fc.assert(fc.property(fc.anything(), (a) => a === P.always(a)()));
	});
});

describe('Math', () => {
	it('odd', () => {
		fc.assert(fc.property(fc.integer(), (a) => P.odd(a) === ((a + 1) % 2 === 0)));
	});

	it('even', () => {
		fc.assert(fc.property(fc.integer(), (a) => P.even(a) === (a % 2 === 0)));
	});

	it('negate', () => {
		fc.assert(fc.property(fc.integer(), (a) => -a === P.negate(a)));
	});

	it('add', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a + b === P.add(a, b)));
	});

	it('subtract', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a - b === P.minus(a, b)));
	});

	it('multiply', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a * b === P.mul(a, b)));
	});

	it('divide', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a / b === P.div(a, b)));
	});

	it('power', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => a ** b === P.power(a, b)));
	});

	it('remain', () => {
		fc.assert(
			fc.property(
				fc.integer(),
				fc.integer().filter((x) => x != 0),
				(a, b) => ((a % b) + b) % b === P.rema(a, b)
			)
		);
	});

	it('divide flip', () => {
		fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => b / a === P.divr(a, b)));
	});

	it('modulo', () => {
		fc.assert(
			fc.property(
				fc.integer(),
				fc.integer().filter((x) => x != 0),
				(a, b) => a % b === P.mod(a, b)
			)
		);
	});

	it('sum', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (a) => a.reduce((x, y) => x + y, 0) === P.sum(a))
		);
	});

	it('product', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (a) => a.reduce((x, y) => x * y, 1) === P.prod(a))
		);
	});

	it('average', () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer(), { minLength: 1 }),
				(a) => a.reduce((x, y) => x + y, 0) / a.length === P.average(a)
			)
		);
	});

	it('sort', () => {
		fc.assert(fc.property(fc.array(fc.integer()), (a) => a.sort() === P.sort(P.under(), a)));
	});

	it('median', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (a) => {
				const sortedArr = a.sort();
				const mid = Math.floor(sortedArr.length / 2);
				const res =
					(sortedArr.length & 1) === 1
						? sortedArr[mid]
						: (sortedArr[mid - 1] + sortedArr[mid]) / 2;
				return (sortedArr.length === 0 ? 0 : res) === P.median(a);
			})
		);
	});

	it('min', () => {
		fc.assert(fc.property(fc.array(fc.integer()), (a) => Math.min(...a) === P.min(a)));
	});

	it('max', () => {
		fc.assert(fc.property(fc.array(fc.integer()), (a) => Math.max(...a) === P.max(a)));
	});

	it('increase 1', () => {
		fc.assert(fc.property(fc.integer(), (a) => a + 1 === P.inc(a)));
	});

	it('decrease 1', () => {
		fc.assert(fc.property(fc.integer(), (a) => a - 1 === P.dec(a)));
	});
});

describe('String', () => {
	it('split', () => {
		fc.assert(
			fc.property(fc.string(), fc.string(), (a, b) => P.deepEqual(a.split(b), P.split(b, a)))
		);
	});

	it('toLower', () => {
		fc.assert(fc.property(fc.string(), (a) => a.toLowerCase() === P.toLower(a)));
	});

	it('toUpper', () => {
		fc.assert(fc.property(fc.string(), (a) => a.toUpperCase() === P.toUpper(a)));
	});

	it('trim', () => {
		fc.assert(fc.property(fc.string(), (a) => a.trim() === P.trim(a)));
	});

	it('words', () => {
		fc.assert(
			fc.property(
				fc.string(),

				(a) =>
					P.deepEqual(
						a.split(/\s|\b/).filter((v) => /^[\w]+$/.test(v)),
						P.words(a)
					)
			)
		);
	});
});

describe('Object', () => {
	it('keys', () => {
		fc.assert(fc.property(fc.object(), (a) => P.deepEqual(Object.keys(a), P.keys(a))));
	});

	it('values', () => {
		fc.assert(fc.property(fc.object(), (a) => P.deepEqual(Object.values(a), P.values(a))));
	});

	it('makePair', () => {
		fc.assert(
			fc.property(fc.array(fc.tuple(fc.string(), fc.anything())), (a) =>
				P.deepEqual(Object.fromEntries(a), P.makePair(a))
			)
		);
	});

	it('has property', () => {
		fc.assert(
			fc.property(
				fc.string(),
				fc.object(),
				(a, b) => Object.prototype.hasOwnProperty.call(b, a) === P.has(a, b)
			)
		);
	});

	it('deepClone', () => {
		fc.assert(
			fc.property(fc.object(), fc.string(), fc.nat(), (a) => {
				const b = P.deepClone(a);
				a[fc.string()] = fc.nat();
				return !P.deepEqual(a, b);
			})
		);
	});

	it('prop', () => {
		fc.assert(fc.property(fc.object(), fc.string(), (a, b) => P.deepEqual(a[b], P.prop(b)(a))));
	});

	it('assoc', () => {
		fc.assert(
			fc.property(fc.string(), fc.anything(), fc.object(), (a, b, c) => {
				const d = P.assoc(a, b, c);
				c[a] = b;
				return P.deepEqual(c, d);
			})
		);
	});

	it('dissoc', () => {
		fc.assert(
			fc.property(fc.string(), fc.object(), (a, b) => {
				const d = P.dissoc(a, b);
				delete b[a];
				return P.deepEqual(b, d);
			})
		);
	});

	it('modify', () => {
		fc.assert(
			fc.property(
				fc.string({
					minLength: 1
				}),
				fc.dictionary(fc.string(), fc.anything(), {
					minKeys: 2
				}),
				fc.object(),
				(a, b, c) => {
					const t = c[a];
					const d0 = P.modify(a, () => b, c);
					const d1 = t ? P.modify(a, () => t, d0) : P.dissoc(a, d0);
					return P.deepEqual(d1, c);
				}
			)
		);
	});
});

describe('Functor Laws', () => {
	// map id = id
	describe('identity morphism', () => {
		fc.assert(fc.property(fc.tuple(), (a) => P.deepEqual(P.map(P.id)(a), P.id(a))));
	});
	// map (f . g) == map f . map g
	describe('preservation of composition', () => {
		// fc.assert(fc.func(), fc.func());
	});
});

describe('List', () => {
	it('zipWith', () => {
		fc.assert(
			fc.property(
				fc.func(fc.anything()),
				fc.array(fc.anything()),
				fc.array(fc.anything()),
				(f, a, b) =>
					P.deepEqual(
						a.map((x, i) => f(x, b[i])),
						P.zipWith(f, a, b)
					)
			)
		);
	});

	it('head', () => {
		fc.assert(
			fc.property(
				fc.array(fc.anything(), {
					minLength: 1
				}),
				(a) => a[0] === P.head(a)
			)
		);
	});

	it('tail', () => {
		fc.assert(
			fc.property(
				fc.array(fc.anything(), {
					minLength: 3
				}),
				(a) => P.deepEqual(a[a.length - 1], P.tail(a))
			)
		);
	});

	it('includes', () => {
		fc.assert(
			fc.property(
				fc.array(fc.anything()),
				fc.anything(),
				(a, b) => a.includes(b) === P.includes(b, a)
			)
		);
	});

	it('reverse', () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), (a) => P.deepEqual(a, P.reverse(P.reverse(a))))
		);
	});

	it('countWith', () => {
		fc.assert(
			fc.property(
				fc.func(fc.boolean()),
				fc.array(fc.anything()),
				(f, a) => a.filter(f).length === P.countWith(f, a)
			)
		);
	});

	it('count', () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.array(fc.anything()),
				(v, a) => a.filter((x) => x === v).length === P.count(v, a)
			)
		);
	});

	it('dropHead', () => {
		fc.assert(
			fc.property(
				fc.array(fc.anything(), {
					minLength: 1
				}),
				(a) => P.deepEqual(a.slice(1), P.dropHead(a))
			)
		);
	});

	it('dropTail', () => {
		fc.assert(
			fc.property(
				fc.array(fc.anything(), {
					minLength: 1
				}),
				(a) => P.deepEqual(a.slice(0, -1), P.dropTail(a))
			)
		);
	});

	it('pairList', () => {
		fc.assert(
			fc.property(
				fc.array(fc.anything(), {
					minLength: 2
				}),
				(a) => P.deepEqual([a[0], a.slice(1)], P.pairList(a))
			)
		);
	});

	it('concat', () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), fc.array(fc.anything()), (a, b) =>
				P.deepEqual(a.concat(b), P.concat(a, b))
			)
		);
	});

	it('concatr', () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), fc.array(fc.anything()), (a, b) =>
				P.deepEqual(b.concat(a), P.concatr(a, b))
			)
		);
	});

	it('every', () => {
		fc.assert(
			fc.property(
				fc.func(fc.boolean()),
				fc.array(fc.anything()),
				(f, a) => a.every(f) === P.every(f, a)
			)
		);
	});

	it('some', () => {
		fc.assert(
			fc.property(
				fc.func(fc.boolean()),
				fc.array(fc.anything()),
				(f, a) => a.some(f) === P.some(f, a)
			)
		);
	});

	it('slice', () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), fc.array(fc.anything()), (a, b, c) =>
				P.deepEqual(c.slice(a, b), P.slice(a, b, c))
			)
		);
	});

	it('join', () => {
		fc.assert(
			fc.property(fc.string(), fc.array(fc.string()), (a, b) => b.join(a) === P.join(a, b))
		);
	});

	it('take', () => {
		fc.assert(
			fc.property(fc.integer(), fc.array(fc.anything()), (a, b) =>
				P.deepEqual(b.slice(0, a), P.take(a, b))
			)
		);
	});

	it('drop', () => {
		fc.assert(
			fc.property(fc.integer(), fc.array(fc.anything()), (a, b) =>
				P.deepEqual(b.slice(a), P.drop(a, b))
			)
		);
	});

	
});
