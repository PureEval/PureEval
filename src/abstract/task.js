class Task {
	constructor(f) {
		this.f = f;
	}

	static of(x) {
		return new Task((_, resolve) => resolve(x));
	}

	map(f) {
		return new Task((reject, resolve) => this.f(reject, (x) => resolve(f(x))));
	}

	chain(f) {
		return new Task((reject, resolve) => this.f(reject, (x) => f(x).f(reject, resolve)));
	}

	fold(reject, resolve) {
		return this.f(reject, resolve);
	}
}

export { Task };
