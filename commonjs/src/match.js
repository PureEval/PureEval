import { _ } from './bind.js'
import { arr_equal } from './logic.js';
import { Maybe } from './abstract/maybe.js';
import { dropHead } from './list.js';

function match(...rules) {
    return function (value) {
        for (let i = 0; i < rules.length; i += 2) {
            if (value == rules[i] || rules[i] == _) {
                if (Array.isArray(value) && value.length) return rules[i + 1](value, value[0], dropHead(value));
                else return rules[i + 1](value);
            }
            else if (Array.isArray(rules[i]) && Array.isArray(value) && arr_equal(value, rules[i])) {
                if (Array.isArray(value) && value.length) return rules[i + 1](value, value[0], dropHead(value));
                else return rules[i + 1](value);
            }
            else if (typeof rules[i] === 'function' && rules[i](value)) return rules[i + 1](value);
            else if (Maybe.is(rules[i]) && Maybe.is(value)) {
                if (rules[i].isNothing() && value.isNothing()) return rules[i + 1](value);
                else if (rules[i].isNothing() || value.isNothing()) continue;
                else if (rules[i].value === value.value) return rules[i + 1](value);
                else if (Array.isArray(rules[i].value) && Array.isArray(value.value) && arr_equal(rules[i].value, value.value)) return rules[i + 1](value);
            }
        }
    }
}

export { match };