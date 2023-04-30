import { _ } from './bind.js';
import { always, arrEqual } from './logic.js';
import { Maybe } from './abstract/maybe.js';
import { dropHead } from './list.js';

function match(...rules) {
	return function (value) {
		for (let i = 0; i < rules.length; i += 2) {
			if (typeof rules[i + 1] != 'function') rules[i + 1] = always(rules[i + 1]);
			if (value == rules[i] || rules[i] == _) {
				if (Array.isArray(value) && value.length)
					return rules[i + 1](value, value[0], dropHead(value));
				else return rules[i + 1](value);
			} else if (
				Array.isArray(rules[i]) &&
				Array.isArray(value) &&
				arrEqual(value, rules[i])
			) {
				if (Array.isArray(value) && value.length)
					return rules[i + 1](value, value[0], dropHead(value));
				else return rules[i + 1](value);
			} else if (typeof rules[i] === 'function' && rules[i](value))
				return rules[i + 1](value);
			else if (Maybe.is(rules[i]) && Maybe.is(value)) {
				if (rules[i].isNothing() && value.isNothing()) return rules[i + 1](value);
				else if (rules[i].isNothing() || value.isNothing()) continue;
				else if (rules[i].value === value.value) return rules[i + 1](value);
				else if (
					Array.isArray(rules[i].value) &&
					Array.isArray(value.value) &&
					arrEqual(rules[i].value, value.value)
				)
					return rules[i + 1](value);
			}
		}
	};
}

export { match };
