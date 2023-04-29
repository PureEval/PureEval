function curry(fun, ...argv) {
	if (fun.length === argv.length) return fun.call(null, ...argv);
	else {
		const result = curry.bind(null, ...arguments);
		result.curryed = true;
		result.len = fun.length - (arguments.length - 1);
		result.origin = fun.bind(null, ...argv);
		return result;
	}
}

function uncurry(fun) {
	return fun.origin;
}

export { curry, uncurry };
