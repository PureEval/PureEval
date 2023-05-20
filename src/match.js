import { _ } from './bind.js';
import { always, arrEqual, equalStrict } from './logic.js';
import { Maybe } from './abstract/maybe.js';
import { dropHead } from './list.js';

function __equalMaybe(a, b) {
	if (!Maybe.is(a) || !Maybe.is(b)) return false;
	if (a.isNothing() && b.isNothing()) return true;
	if (a.isNothing() || b.isNothing()) return false;
	if (a.value === b.value) return true;
	if (Array.isArray(a.value) && Array.isArray(b.value) && arrEqual(a.value, b.value)) return true;
	return false;
}

const __equalArray = (a, b) => Array.isArray(a) && Array.isArray(b) && arrEqual(a, b);

const __processValue = (rule, value) =>
	Array.isArray(value) && value.length ? rule(value, value[0], dropHead(value)) : rule(value);

const __unbalanceTest = (a, b) => a === _ || (typeof a === 'function' && a(b));

const __typeTest = (a, b) => typeof a !== typeof b;

function match(...rules) {
	return (value) => {
		for (let i = 0; i < rules.length; i += 2) {
			if (typeof rules[i + 1] != 'function') rules[i + 1] = always(rules[i + 1]);
			if (__unbalanceTest(rules[i], value)) return __processValue(rules[i + 1], value);
			if (__typeTest(rules[i], value)) continue;
			if (equalStrict(rules[i], value)) return rules[i + 1](value);
			if (__equalArray(rules[i], value)) return __processValue(rules[i + 1], value);
			if (__equalMaybe(rules[i], value)) return rules[i + 1](value);
		}
	};
}

export { match };
