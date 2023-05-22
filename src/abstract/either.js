/* eslint-disable no-unused-vars */
class Right {
	constructor(value) {
		this.value = value;
	}

	static of(value) {
		return new Right(value);
	}

	map(f) {
		return new Right(f(this.value));
	}

	fold(reject, resolve) {
		return resolve(this.value);
	}
}

class Left extends Right {
	map(f) {
		return this;
	}

	fold(reject, resolve) {
		return reject(this.value);
	}
}

export { Right, Left };
