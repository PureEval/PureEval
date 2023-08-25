import { Maybe } from './abstract/maybe.js';
import { _, otherwise, unreached } from './placeholder.js';
import { always, deepEqual, equalStrict } from './logic.js';

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

const __unbalanceTest = (a, b) => a === _ || (typeof a === 'function' && a(b));

const __typeTest = (a, b) => typeof a !== typeof b;

const __equalObject = (a, b) => typeof a === 'object' && deepEqual(a, b);

function __judge(values, checker) {
	if (!checker.length) return false;
	if (checker[0] === otherwise) return true;

	if (values.length !== checker.length) {
		const effectiveChecker = checker[0];
		if (typeof effectiveChecker === 'function' && effectiveChecker(...values)) return true;
		return false;
	}

	for (let idx = 0; idx < checker.length; ++idx) {
		const [rule, value] = [checker[idx], values[idx]];
		if (__unbalanceTest(rule, value)) continue;
		if (__typeTest(rule, value)) return false;
		if (equalStrict(rule, value)) continue;
		if (__equalMaybe(rule, value)) continue;
		if (__equalObject(rule, value)) continue;
		return false;
	}

	return true;
}

function match(...raw) {
	const rules = raw.map(([checker, executer]) => {
		if (!Array.isArray(checker)) checker = [checker];
		if (typeof executer !== 'function') executer = always(executer);
		return [checker, executer];
	});

	return (...values) => {
		for (const [checker, executer] of rules)
			if (__judge(values, checker)) return executer(...values);
		return unreached;
	};
}

export { match };
