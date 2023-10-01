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
