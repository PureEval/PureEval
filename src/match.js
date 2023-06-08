import { _ } from './placeholder.js';
import { always, deepEqual } from './logic.js';
import { Maybe } from './abstract/maybe.js';
import { dropHead } from './list.js';

function __equalMaybe(a, b) {
	if (!Maybe.is(a) || !Maybe.is(b)) return false;
	if (a.isNothing() && b.isNothing()) return true;
	if (a.isNothing() || b.isNothing()) return false;
	const valueA = a.fold(
			() => false,
			(v) => v
		),
		valueB = b.fold(
			() => false,
			(v) => v
		);
	if (valueA === valueB) return true;
	if (__equalArray(valueA, valueB)) return true;
	if (__equalObject(valueA, valueB)) return true;
	return false;
}

const __equalObject = (a, b) => typeof a === 'object' && typeof a === typeof b && deepEqual(a, b);

const __equalArray = (a, b) => Array.isArray(a) && Array.isArray(b) && deepEqual(a, b);

const __processValue = (rule, value) =>
	Array.isArray(value) && value.length ? rule(value, value[0], dropHead(value)) : rule(value);

const __unbalanceTest = (a, b) => a === _ || (typeof a === 'function' && a(b));

const __typeTest = (a, b) => typeof a !== typeof b;

const match = (...rules) => {
	return (value) => {
		for (let i = 0; i < rules.length; i += 2) {
			if (typeof rules[i + 1] != 'function') rules[i + 1] = always(rules[i + 1]);
			if (__unbalanceTest(rules[i], value)) return __processValue(rules[i + 1], value);
			if (__typeTest(rules[i], value)) continue;
			if (rules[i] === value) return rules[i + 1](value);
			if (__equalArray(rules[i], value)) return __processValue(rules[i + 1], value);
			if (__equalMaybe(rules[i], value)) return rules[i + 1](value);
			if (__equalObject(rules[i], value)) return rules[i + 1](value);
		}
	};
};

export { match };
