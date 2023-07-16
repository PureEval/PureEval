import { isNothing } from './maybe.js';

const tag = Symbol('MaybeAsync');

const _MaybeAsync = (v) => ({
	isNothing: async () => {
		try {
			return isNothing(await v);
		} catch (e) {
			return true;
		}
	},
	map: async (f) => {
		try {
			const value = await v;
			return _MaybeAsync(v ? f(value) : null);
		} catch (e) {
			return NothingAsync;
		}
	},
	fold: async (asNothing, asJust) => {
		try {
			const value = await v;
			return value ? asJust(value) : asNothing();
		} catch (e) {
			return asNothing();
		}
	},
	chain: async (f) => {
		try {
			const value = await v;
			return value ? f(value) : NothingAsync;
		} catch (e) {
			return NothingAsync;
		}
	},
	[tag]: true
});

const MaybeAsync = {
	of: (promise) => _MaybeAsync(promise),
	is: (m) => Object.prototype.hasOwnProperty.call(m, tag)
};

const NothingAsync = MaybeAsync.of(null);
const JustAsync = (x) => MaybeAsync.of(x);

export { MaybeAsync, NothingAsync, JustAsync };
