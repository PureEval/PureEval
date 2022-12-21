import { curry_any } from "../curry.js";
import { assoc, prop } from "../object.js";

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

const view = curry_any((lens, value) => lens.get(value));
const set = curry_any((lens, opt, value) => lens.set(opt, value));
const over = curry_any((lens, f, value) => lens.set(f(lens.get(value)), value));

export { Lens, view, set, over };