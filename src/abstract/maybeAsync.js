import { Monad } from './monad.js';

class MaybeAsync extends Monad {
	constructor(promise) {
		super(promise);
	}

	static lift(promise) {
		return new MaybeAsync(promise);
	}

	static is(m) {
		return m instanceof MaybeAsync;
	}

	async isNothing() {
		return this.value === null || this.value === undefined;
	}

	async map(f) {
		const value = await this.value;
		return new MaybeAsync(value ? f(value) : null);
	}

	async chain(f) {
		const value = await this.value;
		return value ? f(value) : new MaybeAsync(null);
	}

	async fold(asNothing, asJust) {
		const value = await this.value;
		return value ? asJust(value) : asNothing();
	}
}

const NothingAsync = MaybeAsync.lift(Promise.resolve(null));
const JustAsync = (x) => MaybeAsync.lift(Promise.resolve(x));

export { MaybeAsync, NothingAsync, JustAsync };
