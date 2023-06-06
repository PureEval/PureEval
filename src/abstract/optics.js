import { curry } from '../curry.js';
import { assoc, prop } from '../object.js';

const _Lens = (getter, setter) => ({
	getter: getter,
	setter: setter
});

const Lens = {
	of: (getter, setter) => _Lens(getter, setter),
	bind: (pos) => _Lens(prop(pos), assoc(pos))
};

const view = curry((lens, value) => lens.getter(value));
const set = curry((lens, opt, value) => lens.setter(opt, value));
const over = curry((lens, f, value) => lens.setter(f(lens.getter(value)), value));

export { Lens, view, set, over };
