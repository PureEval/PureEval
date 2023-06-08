const tag = Symbol('Maybe');

const isNothing = (v) => v === null || v === undefined || Number.isNaN(v);

const _Maybe = (v) => ({
	isNothing: () => isNothing(v),
	map: (f) => {
		try {
			return isNothing(v) ? Nothing : _Maybe(f(v));
		} catch (error) {
			return Nothing;
		}
	},
	fold: (asNothing, asJust) => (isNothing(v) ? asNothing(v) : asJust(v)),
	[tag]: true
});

const Maybe = {
	of: (v) => _Maybe(v),
	is: (m) => Object.prototype.hasOwnProperty.call(m, tag)
};

const Nothing = Maybe.of(null);
const Just = (x) => Maybe.of(x);

export { Maybe, Nothing, Just, isNothing };
