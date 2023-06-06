/* eslint-disable no-case-declarations */
import { curry } from './curry.js';
import { summon } from './summon.js';

const _assoc = (pos, val, obj) =>
	Array.isArray(obj)
		? [...obj.slice(0, pos), val, ...obj.slice(pos + 1)]
		: { ...obj, [pos]: val };

const _shallowCloneObject = (pos, obj) =>
	Number.isInteger(pos) && Array.isArray(obj) ? [...obj] : { ...obj };

const _dissoc = (pos, obj) => {
	if (Number.isInteger(pos) && Array.isArray(obj)) {
		const result = [...obj];
		result.splice(pos, 1);
		return result;
	}
	// eslint-disable-next-line no-unused-vars
	const { [pos]: _, ...rest } = obj;
	return rest;
};

const prop = curry((s, a) =>
	Array.isArray(s) ? s.reduce((acc, cur) => acc && acc[cur], a) : a[s]
);

const assoc = curry((s, v, a) => {
	if (Array.isArray(s)) {
		const [idx, ...tail] = s;
		const nextObj =
			a && Object.prototype.hasOwnProperty.call(a, idx)
				? a[idx]
				: Number.isInteger(s[1])
				? []
				: {};
		v = s.length > 1 ? assoc(tail, v, nextObj) : v;
		return _assoc(idx, v, a);
	} else return _assoc(s, v, a);
});

const modify = curry((s, f, a) => {
	if (Array.isArray(s)) {
		const [head, ...tail] = s;
		return tail.length === 0
			? assoc(head, f(a[head]), a)
			: assoc(head, modify(tail, f, a[head]), a);
	} else return assoc(s, f(a[s]), a);
});

const dissoc = curry((s, a) => {
	if (Array.isArray(s)) {
		if (s.length === 0) return a;
		const [head, ...tail] = s;
		if (tail.length === 0) return _dissoc(head, a);
		else {
			const nextObj = a[head] == null ? _shallowCloneObject(head, a) : a[head];
			return assoc(head, dissoc(tail, nextObj), a);
		}
	} else return _dissoc(s, a);
});

const deepClone = (obj) => {
	if (obj === null || typeof obj !== 'object') return obj;
	if (obj instanceof RegExp || obj instanceof Date) return new obj.constructor(obj);
	return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepClone(value)]));
};

const keys = (x) => Object.keys(x);

const values = (x) => Object.values(x);

const makePair = (arr) => Object.fromEntries(arr);

const construct = (cls) => curry(summon(cls.constructor.length, (...args) => new cls(...args)));

const has = curry((prop, obj) => Object.prototype.hasOwnProperty.call(obj, prop));

export { prop, assoc, modify, dissoc, deepClone, keys, values, makePair, construct, has };
