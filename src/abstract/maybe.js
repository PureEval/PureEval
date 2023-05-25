import { Monad } from './monad.js';

class Maybe extends Monad {
	constructor(value) {
		super(value);
	}

	static lift(v) {
		return new Maybe(v);
	}

	static is(m) {
		return m instanceof Maybe;
	}

	isNothing() {
		return this.value === null || this.value === undefined;
	}

	map(f) {
		return this.isNothing() ? new Maybe(null) : new Maybe(f(this.value));
	}

	chain(f) {
		return this.isNothing() ? new Maybe(null) : f(this.value);
	}

	fold(asNothing, asJust) {
		return this.isNothing() ? asNothing(this.value) : asJust(this.value);
	}
}

const Nothing = Maybe.lift(null);
const Just = (x) => Maybe.lift(x);

export { Maybe, Nothing, Just };
