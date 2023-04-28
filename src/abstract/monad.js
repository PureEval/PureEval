class Monad {
	constructor(v) {
		this.value = v;
	}

	static lift(v) {
		return new Monad(v);
	}

	map(f) {
		return this.lift(f(this.v));
	}

	chain(f) {
		return f(this.value);
	}

	apply(m) {
		return m.map(this.value);
	}
}

export { Monad };
