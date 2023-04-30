/* eslint-disable no-case-declarations */
import { Just, Nothing } from './abstract/maybe.js';
import { curry } from './curry.js';
import { summon } from './summon.js';

function _assoc(pos, val, obj) {
	if (Array.isArray(obj)) {
		const arr = [].concat(obj);
		arr[pos] = val;
		return arr;
	}
	const result = {};
	for (const p in obj) result[p] = obj[p];
	result[pos] = val;
	return result;
}

function _shallowCloneObject(pos, obj) {
	if (Number.isInteger(pos) && Array.isArray(obj)) return [].concat(obj);
	const result = {};
	for (const p in obj) result[p] = obj[p];
	return result;
}

function _remove(start, cnt, list) {
	const result = Array.prototype.slice.call(list, 0);
	result.splice(start, cnt);
	return result;
}

function _dissoc(pos, obj) {
	if (Number.isInteger(pos) && Array.isArray(obj)) return _remove(pos, 1, obj);
	const result = {};
	for (const p in obj) result[p] = obj[p];
	delete result[pos];
	return result;
}

const prop = curry((s, a) => {
	if (Array.isArray(s)) {
		let value = a;
		for (const index in s) value = value[s[index]];
		return value;
	} else return a[s];
});

const assoc = curry((s, v, a) => {
	if (Array.isArray(s)) {
		const idx = s[0];
		if (s.length > 1) {
			const nextObj =
				!Just(a).isNothing() && Object.prototype.hasOwnProperty.call(a, idx)
					? a[idx]
					: Number.isInteger(s[1])
					? []
					: {};
			v = assoc(Array.prototype.slice.call(s, 1), v, nextObj);
		}
		return _assoc(idx, v, a);
	} else return _assoc(s, v, a);
});

const modify = curry((s, f, a) => {
	if (Array.isArray(s)) {
		let value = a;
		for (const index in s) {
			if (index == s.length - 1) {
				if (Just(value[s[index]]).isNothing()) return Nothing;
				else value[s[index]] = f(value[s[index]]);
			}
			value = value[s[index]];
		}
	} else {
		if (Just(a[s]).isNothing()) return Nothing;
		else a[s] = f(a[s]);
	}
	return a;
});

const dissoc = curry((s, a) => {
	if (Array.isArray(s)) {
		switch (s.length) {
			case 0:
				return a;
			case 1:
				return _dissoc(s[0], a);
			default:
				const head = s[0],
					tail = Array.prototype.slice.call(s, 1);
				if (a[head] == null) return _shallowCloneObject(head, a);
				else return assoc(head, dissoc(tail, a[head]), a);
		}
	} else return _dissoc(s, a);
});

function valuesIn(x) {
	const result = [];
	for (const i in x) result.push(x[i]);
	return result;
}

function makePair(arr) {
	const result = {};
	for (const i in arr) result[arr[i][0]] = arr[i][1];
	return result;
}

const construct = (cls) => curry(summon(cls.constructor.length, (...args) => new cls(...args)));

const has = curry((prop, obj) => Object.prototype.hasOwnProperty.call(obj, prop));

export { prop, assoc, modify, dissoc, valuesIn, makePair, construct, has };
