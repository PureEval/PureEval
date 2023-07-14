import { _ } from './placeholder.js';
import { always, deepEqual, equalStrict } from './logic.js';
import { Maybe } from './abstract/maybe.js';
import { dropHead } from './list.js';

function __equalMaybe(a, b) {
	if (!Maybe.is(a) || !Maybe.is(b)) return false;
	if (a.isNothing() !== b.isNothing()) return false;
	const [valueA, valueB] = [
		a.fold(
			() => false,
			(v) => v
		),
		b.fold(
			() => false,
			(v) => v
		)
	];
	return valueA === valueB || __equalObject(valueA, valueB);
}

const __equalObject = (a, b) => typeof a === 'object' && deepEqual(a, b);

const __processArray = (rule, value) =>
	Array.isArray(value) && value.length ? rule(value, value[0], dropHead(value)) : rule(value);

const __typeTest = (a, b) => typeof a !== typeof b;

const __unbalanceTest = (a, b) => a === _ || (typeof a === 'function' && a(b));

const __transformConstant = (value) =>
	typeof value !== 'function' && value !== _ ? always(value) : value;

const match = (...rules) => {
	const rule = [];
	for (let i = 0; i < rules.length; i += 2)
		rule.push([rules[i], __transformConstant(rules[i + 1])]);
	return (value) => {
		for (const [checker, executer] of rule) {
			if (__unbalanceTest(checker, value)) return __processArray(executer, value);
			if (__typeTest(checker, value)) continue;
			if (equalStrict(checker, value)) return executer(value);
			if (__equalMaybe(checker, value)) return executer(value);
			if (__equalObject(checker, value)) return __processArray(executer, value);
		}
	};
};

export { match };
