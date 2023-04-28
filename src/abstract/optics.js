import { curry } from '../curry.js';
import { assoc, prop } from '../object.js';

class Lens {
	constructor(getter, setter) {
		this.get = getter;
		this.set = setter;
	}

	static of(getter, setter) {
		return new Lens(getter, setter);
	}

	static bind(pos) {
		return new Lens(prop(pos), assoc(pos));
	}
}

const view = curry((lens, value) => lens.get(value));
const set = curry((lens, opt, value) => lens.set(opt, value));
const over = curry((lens, f, value) => lens.set(f(lens.get(value)), value));

export { Lens, view, set, over };
